import express from "express";
import { getCourseController, getUsersByCourseController } from "../controllers/courseController.js";

const router = express.Router();

router.get("/get-courses", getCourseController);
router.get("/get-users/:course", getUsersByCourseController);

export default router;