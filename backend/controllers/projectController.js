import FileModel from "../models/FileModel.js";
import ProjectModel from "../models/ProjectModel.js";

export const getAllProjectsByCourseController = async (req, res) => {
  try {
    const { course } = await req.params;
    const projects = await ProjectModel.find({
      course,
    });
    if (projects) {
      res.status(200).send({
        success: true,
        message: "Projects found by course",
        projects,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "No projects found",
        projects: [],
      });
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error getting all projects",
    });
  }
};

export const addProjectController = async (req, res) => {
  try {
    const { title, stack, numOfMembers, members, mentor, course } = req.body;

    const formattedMembers = members.map((member) => ({
      user: member.userId,
      role: member.role,
    }));
    const newProject = await new ProjectModel({
      title,
      stack,
      numOfMembers,
      members: formattedMembers,
      mentor,
      course,
    }).save();

    res.status(200).send({
      success: true,
      message: "Project added successfully",
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: `Error adding project ${err}`,
    });
  }
};

export const getProjectsByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const projects = await ProjectModel.find({
      members: { $elemMatch: { user: id } },
    });
    if (projects) {
      res.status(200).send({
        success: true,
        message: "Projects found",
        projects,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "No projects found",
        projects: [],
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Error getting projects by id: ${error}`,
    });
  }
};

export const deleteProjectController = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await ProjectModel.findByIdAndDelete({
      _id: id,
    });
    if (response) {
      res.status(200).send({
        success: true,
        message: "Project Deleted successfully",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error deleting project",
    });
  }
};

export const getProjectsByTeacherController = async (req, res) => {
  try {
    const { teacherid } = req.params;
    const projects = await ProjectModel.find({
      mentor: teacherid,
    });
    if (projects) {
      res.status(200).send({
        success: true,
        message: "Projects found",
        projects,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "No projects found",
        projects: [],
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error getting projects by teacher",
    });
  }
};

export const getProjectDetailsByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await ProjectModel.findOne({
      _id: id,
    });
    if (project) {
      res.status(200).send({
        success: true,
        message: "Project found",
        project,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "No project found",
        project: {},
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error getting project",
    });
  }
};

export const getFilesByProjectIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await ProjectModel.findById(id);

    if (project) {
      const fileIds = project.files;

      const files = await FileModel.find({ _id: { $in: fileIds } });

      res.status(200).send({
        success: true,
        message: "Files found",
        files,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Project not found",
        files: [],
      });
    }
  } catch (error) {}
};
