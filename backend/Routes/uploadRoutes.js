import express from "express";
import { addFileToProjectController, addFolderToProjectController } from "../controllers/uploadController.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage()});

const router = express.Router();

router.post('/add-file', upload.single('file'), addFileToProjectController);
router.post('/add-folder', addFolderToProjectController);

export default router;