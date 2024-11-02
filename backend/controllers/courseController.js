import ProjectModel from "../models/ProjectModel.js";
import UniversityModel from "../models/UniversityModel.js";
import UserModel from "../models/UserModel.js";

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

export const getUsersByCourseController = async (req, res) => {
  try {
    const { course } = req.params;

    const users = await UserModel.find({
      course,
    });

    const studentProjectData = users.map((user) => {
      const projectDetails = ProjectModel.findOne({
        members: {
          $elemMatch : {
            user: user._id
          }
        }
      })

      return {
        sname: `${user.fname} ${user.lname}`,
        userId: user._id,
        projectId: projectDetails && projectDetails._id,
        ptitle: projectDetails && `${projectDetails.title}`
      }
    })

    if (users) {
      res.status(200).json({
        success: true,
        message: "Users found successfully",
        studentProjectData,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "No users found",
      });
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error getting users by course",
    });
  }
};
