import express from "express";
import { getCourseController } from "../controllers/courseController.js";

const router = express.Router();

router.get("/get-courses", getCourseController);

export default router;