import express, { Router } from "express";
import Student from "../controllers/student.js";
import { check } from "express-validator";

const router = Router();

const student = new Student();

router.get("/addname", student.getAddPAge);
router.get("/list/:page", student.getAllDoc);
router.post("/addname",
  check("name", "Name is required. Please enter your response. ")
    .not()
    .isEmpty(),
  check("age", "Age is required. Please enter your response. ")
    .not()
    .isEmpty(),
  check("fees", "Fees is required. Please enter your response. ")
    .not()
    .isEmpty(),
    check("number", "Number is required. Please enter your response. ")
    .not()
    .isEmpty()
    .isLength({min : 10})
    .withMessage("Mobile num ber shouldb be of 10 digi")
    ,
  student.createDoc
);
router.get("/edit/:id/:current", student.editDoc);
router.post("/update/:id/:current", student.updateDocId);
router.get("/delete/:id/:current", student.deleteDocId);

export default router;
