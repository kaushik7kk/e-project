import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import Topbar from "../components/Topbar.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userData = useSelector((state) => state.auth.user);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/course/get-courses?university=${userData.university}`
        );
        if (res.data.success) {
          setCourses(res.data.courses);
        } else {
          console.error(res.data.message);
        }
      } catch (err) {
        const errMsg = err.response?.data.message;
        console.error(errMsg);
      }
    };

    fetchCourses();
  });

  if (!userData) {
    return <>Loading...</>;
  }

  const courseClickHandler = (e) => {
    const course = e.target.innerText;
    navigate(`/${userData.university}/${course}`);
  };

  const studentDash = (
    <>
      <Topbar />
      <div className="dash-container mx-auto mt-5 flex flex-col items-center justify-between p-5">
        <div className="university-heading text-center p-3">
          {userData.university === "DU"
            ? "Delhi University"
            : "Indraprastha University"}
        </div>
        <div className="course-heading mt-5">Available Courses</div>
        <div className="courses-container flex flex-col justify-around items-center">
          <div className="course-couple flex justify-around items-center">
            <div
              onClick={courseClickHandler}
              className={`course ${
                courses[0] === userData.course ? "text-green-600" : ""
              }`}
            >
              {courses[0]}
            </div>
            <div
              onClick={courseClickHandler}
              className={`course ${
                courses[1] === userData.course ? "text-green-800" : ""
              }`}
            >
              {courses[1]}
            </div>
          </div>
          <div className="course-couple flex justify-around items-center">
            <div
              onClick={courseClickHandler}
              className={`course ${
                courses[2] === userData.course ? "text-green-800" : ""
              }`}
            >
              {courses[2]}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return studentDash;
}
