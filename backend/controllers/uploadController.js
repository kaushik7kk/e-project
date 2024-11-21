import FileModel from "../models/FileModel.js";
import FolderModel from "../models/FolderModel.js";
import ProjectModel from "../models/ProjectModel.js";

export const addFileToProjectController = async (req, res) => {
  try {
    const { id } = req.body;

    const projectById = await ProjectModel.findById(id);

    if (!projectById) {
      res.status(404).send({
        success: false,
        message: "No project found to add file.",
      });
    }

    const newFile = new FileModel({
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      buffer: req.file.buffer,
    });

    await newFile.save();

    projectById.files.push(newFile._id);
    await projectById.save();

    res.status(200).send({
      success: true,
      message: "File uploaded successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Error uploading file- ${error}`,
    });
  }
};

export const addFolderToProjectController = async (req, res) => {
  try {
    const { projectId, folderName } = req.body;
    console.log("works");

    const projectById = await ProjectModel.findById(projectId);

    if (!projectById) {
      res.status(404).send({
        success: false,
        message: "No project found to add folder",
      });
    }

    const newFolder = new FolderModel({
      name: folderName,
    });

    await newFolder.save();

    projectById.folders.push(newFolder._id);
    await projectById.save();

    res.status(200).send({
      success: true,
      message: "Folder added successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error adding folder to project",
    });
  }
};

export const addFileToFolderController = async (req, res) => {
  try {
    const { id } = req.body;

    const folderById = await FolderModel.findById(id);

    if (!folderById) {
      res.status(404).send({
        success: false,
        message: "No folder found to add file.",
      });
    }

    const newFile = new FileModel({
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      buffer: req.file.buffer,
    });

    await newFile.save();

    folderById.files.push(newFile._id);
    await folderById.save();

    res.status(200).send({
      success: true,
      message: "File uploaded successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Error uploading file- ${error}`,
    });
  }
};
