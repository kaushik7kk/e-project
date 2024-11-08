import TeacherModel from "../models/TeacherModel.js";

export const getTeachersByCourseController = async (req, res) => {
  try {
    const { course } = req.params;

    const teachers = await TeacherModel.find({
      course,
    });

    if (teachers) {
      res.status(200).send({
        success: true,
        message: "Teachers found",
        teachers,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "No teachers found",
        teachers: [],
      });
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error getting teachers",
    });
  }
};
