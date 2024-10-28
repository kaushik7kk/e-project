import express from "express"
import { registerController, registerTeacher, StudentLogin, teacherLogin } from "../controllers/authController.js";

const router=express.Router();

router.post('/register/student',registerController)
router.post('/register/teacher',registerTeacher)
router.post('/login/student',StudentLogin)
router.post('/login/teacher',teacherLogin)
  

export default router;