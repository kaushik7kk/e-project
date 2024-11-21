import express from "express";
import {
  addProjectController,
  deleteProjectController,
  getAllProjectsByCourseController,
  getFilesByIdsController,
  getFilesByProjectIdController,
  getFoldersByProjectIdController,
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
router.get("/get-folders/:id", getFoldersByProjectIdController);
router.post("/get-files-by-ids", getFilesByIdsController);

export default router;
