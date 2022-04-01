import StudentModel from "../models/student.js";
import { validationResult } from "express-validator";

function regexPhoneNumber(str) {
  const regexPhoneNumber = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (str.match(regexPhoneNumber)) {
    return true;
  } else {
    return false;
  }
}

export default class Student {

  //Add Data
  getAddPAge = (req, res) => {
    var success = false;
    var fail = false;
    // console.log("Hello");
    res.render("addname", {
      bodyData: req.body,
      success: success,
      fail: fail,
    });
  };

  //Create Document
  createDoc = async (req, res) => {
    // console.log(req.body);
    // console.log(req.session.message);
    try {
      const errors = validationResult(req);
      // console.log("errors: ", errors);
      if (!errors.isEmpty()) {
        const result = await StudentModel.find();
        const message = req.session.message;
        req.session.message = undefined;

        return res.render("addname", {
          bodyData: req.body,
          alert: errors.array(),
          data: result,
          message,
          fail : undefined,
          success: undefined
        });
      }
      const { name, age, fees, number } = req.body;
      var checkPhone = regexPhoneNumber(number);
      // console.log(checkPhone);
      if (checkPhone) {
        const doc = new StudentModel({
          name: name,
          age: age,
          fees: fees,
          number: number,
        });
        // Saving Document
        const result = await doc.save();
        //console.log(result);
        // req.session.message = "Successfully Saved :)";
        var success = "Successfully Saved :)";
        var fail = false;
        // return res.redirect("/student/addname");
        return res.render("addname", {
          bodyData: null,
          success: success,
          fail: fail,
        });
      } else {
        // req.session.message = "Phone number must be 10 digits :)";
        //  return res.redirect("/student/addname");
        var fail = "Cude not save Phone number must be 10 digits :)";
        var success = false;
        // return res.redirect("/student/addname");
        return res.render("addname", {
          bodyData: req.body,
          success: success,
          fail: fail,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };


  // Retrive all document
  getAllDoc = async (req, res) => {
    try {
      const perPage = 5;
      const page = req.params.page || 1;
      const message = req.session.message;
      req.session.message = undefined;
      await StudentModel.find({})
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec(async function (err, products) {
          await StudentModel.count().exec(function (err, count) {
            if (err) return next(err);
            return res.render("index", {
              data: products,
              current: page,
              pages: Math.ceil(count / perPage),
              message,
              bodyData: undefined,
            });
          });
        });
    } catch (error) {
      console.log(error);
    }
  };


  // Show Edit From with data
  editDoc = async (req, res) => {
    // console.log(req.params.id);
    try {
      const result = await StudentModel.findById(req.params.id);
      //console.log(result);
      var current = req.params.current;
      res.render("edit", { data: result, current: current });
    } catch (error) {
      console.log(error);
    }
  };


  //Update document
  updateDocId = async (req, res) => {
    try {
      const result = await StudentModel.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      var current = req.params.current;
      req.session.message = "Update Successfully.!";
      return res.redirect("/student/list/" + current);
    } catch (error) {
      console.log(error);
    }
  };


  //Delete document
  deleteDocId = async (req, res) => {
    try {
      const result = await StudentModel.findByIdAndDelete(req.params.id);
      var current = req.params.current;
      req.session.message = "Data deleted.!";
      return res.redirect("/student/list/" + current);
    } catch (error) {
      console.log(error);
    }
  };
}
