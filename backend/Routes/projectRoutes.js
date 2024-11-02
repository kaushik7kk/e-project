import express from "express";
import { addProjectController, getAllProjectsByCourseController } from "../controllers/projectController.js";

const router = express.Router();

router.get("/get-projects/:course", getAllProjectsByCourseController);
router.post('/add-project', addProjectController);

export default router;
