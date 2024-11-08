import express from "express";
import {
  addProjectController,
  getAllProjectsByCourseController,
  getProjectsByIdController,
} from "../controllers/projectController.js";

const router = express.Router();

router.get("/get-projects/:course", getAllProjectsByCourseController);
router.post("/add-project", addProjectController);
router.get("/get-my-projects/:id", getProjectsByIdController);

export default router;
