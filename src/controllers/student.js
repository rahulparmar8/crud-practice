import StudentModel from "../models/student.js";
import { validationResult } from "express-validator";

export default class Student {
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
        const message1 = req.session.message1;
        req.session.message1 = undefined;

        return res.render("index", {
          bodyData: req.body,
          alert: errors.array(),
          data: result,
          message,
          message1,
        });
      }
      const { name, age, fees } = req.body;
      const doc = new StudentModel({
        name: name,
        age: age,
        fees: fees,
      });
      // Saving document
      const result = await doc.save();
      //console.log(result);
      req.session.message = "Successfully Saved :)";
      return res.redirect("/student");
    } catch (error) {
      console.log(error);
    }
  };

  // Retrive all document
  getAllDoc = async (req, res) => {
    try {
      const result = await StudentModel.find();
      const message = req.session.message;
      req.session.message = undefined;
      //console.log(result);
      res.render("index", {
        data: result,
        message,
        bodyData: undefined,
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
      res.render("edit", { data: result });
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
      req.session.message = "Update Successfully.!";
      return res.redirect("/student");
    } catch (error) {
      console.log(error);
    }
  };

  //Delete document
  deleteDocId = async (req, res) => {
    try {
      const result = await StudentModel.findByIdAndDelete(req.params.id);
      req.session.message = "Data deleted.!";
      return res.redirect("/student");
    } catch (error) {
      console.log(error);
    }
  };
}
