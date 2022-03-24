import express, { Router } from "express";
import Student from "../controllers/student.js";
const router = Router();

const student = new Student();

router.get("/", student.getAllDoc);
router.post("/", student.createDoc);
router.get("/edit/:id", student.editDoc);
router.post("/update/:id", student.updateDocId);
router.get("/delete/:id", student.deleteDocId);

export default router;
