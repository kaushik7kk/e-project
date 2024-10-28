import React, { useEffect, useMemo, useState } from "react";
import "../../styles/RegisterForm.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getCourses, toggleSelected } from "../../store/courseReducer";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function RegisterForm() {
  const initialRegData = useMemo(
    () => ({
      fname: "",
      lname: "",
      email: "",
      password: "",
      phone: "",
      university: "IPU",
    }),
    []
  );
  const [isOpen, setIsOpen] = useState(false);
  const formType = useSelector((state) => state.form);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const courseList = useSelector((state) => state.course.courseList);
  const selectedCourses = useSelector((state) => state.course.selectedCourses);

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate])

  const [regData, setRegData] = useState({
    ...initialRegData,
    course: formType === "student" ? "MCA" : [],
  });

  useEffect(() => {
    dispatch(getCourses(regData.university));
  }, [dispatch, regData.university]);

  useEffect(() => {
    setRegData((prev) => ({
      ...prev,
      course: selectedCourses,
    }));
  }, [selectedCourses]);

  useEffect(() => {
    if (formType === "student") {
      setRegData({
        ...initialRegData,
        course: "MCA",
      });
    } else {
      setRegData({
        ...initialRegData,
        course: [],
      });
    }
  }, [formType, initialRegData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setRegData({
      ...regData,
      [id]: value,
    });
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelectCourse = (course) => {
    dispatch(toggleSelected(course));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formType === "student") {
      try {
        const res = await axios.post(
          "http://localhost:8000/api/v1/auth/register/student",
          {
            fname: regData.fname,
            lname: regData.lname,
            email: regData.email,
            password: regData.password,
            phone: regData.phone,
            university: regData.university,
            course: regData.course,
          }
        );
        if (res.data.success) {
          toast.success(res.data.message, {
            duration: 3000,
          });
          navigate("/login");
        } else {
          toast.error(res.data.message, {
            duration: 3000,
          });
        }
      } catch (err) {
        const errorMsg = err.response?.data.message;
        toast.error(errorMsg, {
          duration: 3000,
        });
      }
    } else {
      try {
        const res = await axios.post(
          "http://localhost:8000/api/v1/auth/register/teacher",
          {
            fname: regData.fname,
            lname: regData.lname,
            email: regData.email,
            password: regData.password,
            phone: regData.phone,
            university: regData.university,
            course: regData.course,
          }
        );
        if (res.data.success) {
          toast.success(res.data.message, {
            duration: 3000,
          });
          navigate("/login");
        } else {
          toast.error(res.data.message, {
            duration: 3000,
          });
        }
      } catch (err) {
        const errorMsg = err.response?.data.message;
        toast.error(errorMsg, {
          duration: 3000,
        });
      }
    }
  };

  return (
    <>
      <div className="form-container mx-auto flex flex-col items-center">
        <div className="form-heading mt-4 noto-sans-warang-citi-regular">
          {formType === "teacher"
            ? `Teacher Registration`
            : `Student Registration`}
        </div>
        <form action="" className="mt-5" onSubmit={handleSubmit}>
          <div className="input-group flex justify-between items-center">
            <label htmlFor="fname">First Name:</label>
            <input
              type="text"
              placeholder="Enter first name..."
              name="fname"
              id="fname"
              className="mx-4 my-3 p-2"
              onChange={handleChange}
              value={regData.fname}
            />
          </div>
          <div className="input-group flex justify-between items-center">
            <label htmlFor="lname">Last Name:</label>
            <input
              type="text"
              placeholder="Enter last name..."
              name="lname"
              id="lname"
              className="mx-4 my-3 p-2"
              onChange={handleChange}
              value={regData.lname}
            />
          </div>
          <div className="input-group flex justify-between items-center">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              placeholder="Enter email..."
              name="email"
              id="email"
              className="mx-4 my-3 p-2"
              onChange={handleChange}
              value={regData.email}
            />
          </div>
          <div className="input-group flex justify-between items-center">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              placeholder="Enter password..."
              name="password"
              id="password"
              className="mx-4 my-3 p-2"
              onChange={handleChange}
              value={regData.password}
            />
          </div>
          <div className="input-group flex justify-between items-center">
            <label htmlFor="phone">Phone:</label>
            <input
              type="number"
              placeholder="Enter phone number..."
              name="phone"
              id="phone"
              className="mx-4 my-3 p-2"
              minLength={10}
              maxLength={10}
              onChange={handleChange}
              value={regData.phone}
            />
          </div>
          <div className="input-group flex justify-between items-center">
            <label htmlFor="university">University:</label>
            <select
              name="university"
              id="university"
              className="mx-4 my-3 p-2"
              onChange={handleChange}
              value={regData.university}
            >
              <option value="IPU">IPU</option>
              <option value="DU">DU</option>
            </select>
          </div>
          <div className="input-group flex justify-around items-center">
            <label htmlFor="Course">Course:</label>
            {formType === "student" ? (
              <select
                name="course"
                id="course"
                onChange={handleChange}
                value={regData.course}
              >
                {courseList.map((course, index) => {
                  return (
                    <option value={course} key={index}>
                      {course}
                    </option>
                  );
                })}
              </select>
            ) : (
              <>
                <div>
                  <div onClick={toggleDropdown} className="dropdown-header">
                    Select courses
                  </div>
                  {isOpen && (
                    <ul className="dropdown-list">
                      {courseList.map((course, index) => (
                        <li
                          key={index}
                          onClick={() => handleSelectCourse(course)}
                        >
                          {selectedCourses.includes(course) ? "✓ " : ""}
                          {course}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="input-group flex justify-center mt-2">
            <button type="submit" className="p-4 noto-sans-warang-citi-regular">
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
