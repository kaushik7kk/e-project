import UniversityModel from "../models/UniversityModel.js";

export const getCourseController = async (req, res) => {
  const university = req.query.university;

  const courses = await UniversityModel.findOne({
    name: university,
  });

  if (courses) {
    res.json(courses);
    // console.log(courses);
  }
};
