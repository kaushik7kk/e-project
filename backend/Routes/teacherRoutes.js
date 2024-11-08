import express from "express";
import { getTeachersByCourseController } from "../controllers/teacherController.js";

const router = express.Router();

router.get('/get-teachers/:course', getTeachersByCourseController);

export default router;