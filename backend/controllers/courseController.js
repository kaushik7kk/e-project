import UniversityModel from "../models/UniversityModel.js";

export const getCourseController = async (req, res) => {
  try {
    const university = req.query.university;

    const uni = await UniversityModel.findOne({
      name: university,
    });
    if (uni) {
      res.status(200).json({
        success: true,
        message: "Courses found",
        courses: uni.courses,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No courses found",
      });
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error getting courses",
    });
  }
};
