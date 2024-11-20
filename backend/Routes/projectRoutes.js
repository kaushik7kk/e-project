import express from "express";
import {
  addProjectController,
  deleteProjectController,
  getAllProjectsByCourseController,
  getFilesByProjectIdController,
  getProjectDetailsByIdController,
  getProjectsByIdController,
} from "../controllers/projectController.js";

const router = express.Router();

router.get("/get-projects/:course", getAllProjectsByCourseController);
router.post("/add-project", addProjectController);
router.get("/get-my-projects/:id", getProjectsByIdController);
router.delete("/delete-project/:id", deleteProjectController);
router.get("/get-project-details/:id", getProjectDetailsByIdController);
router.get("/get-files/:id", getFilesByProjectIdController);

export default router;
