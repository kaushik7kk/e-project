import UniversityModel from "../models/UniversityModel";

export const getCourseController =  async (req, res) => {
    const { university } = req.body;

    const courses = UniversityModel.find({
        name: university
    });
    console.log(courses);
}