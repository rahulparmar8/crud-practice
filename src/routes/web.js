import express, { Router } from "express";
import Student from "../controllers/student.js";
import { check } from "express-validator";

const router = Router();

const student = new Student();

router.get("/list/:page", student.getAllDoc);
router.get("/addname", student.getAddPAge);
router.post(
  "/addname",
  check("name", "Name is required. Please enter your response. ")
    .not()
    .isEmpty(),
  check("age", "Age is required. Please enter your response. ").not().isEmpty(),
  check("fees", "Fees is required. Please enter your response. ")
    .not()
    .isEmpty(),
  student.createDoc
);
router.get("/edit/:id/:current", student.editDoc);
router.post("/update/:id/:current", student.updateDocId);
router.get("/delete/:id/:current", student.deleteDocId);

export default router;
