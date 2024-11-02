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
    const {title, stack, numOfMembers, members, mentor, course} = await req.body();

    

  } catch(err) {
    res.status(500).send({
      success: false,
      message: "Error adding project"
    })
  }
}