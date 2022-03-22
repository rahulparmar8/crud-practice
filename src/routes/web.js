import express from "express";
import Student from "../controllers/student";
const router = express.Router();

router.get("/", Student, getAllDoc);

export default router;
