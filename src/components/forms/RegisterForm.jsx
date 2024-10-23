import React, { useEffect, useState } from "react";
import "../../styles/RegisterForm.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getCourses } from "../../store/courseReducer";

export default function RegisterForm() {
  const formType = useSelector((state) => state.form);
  const dispatch = useDispatch();

  const courses = useSelector((state) => state.course);

  const [regData, setRegData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    phone: "",
    university: "IPU",
    course: "MCA",
  });

  useEffect(() => {
    dispatch(getCourses(regData.university));
  }, [dispatch, regData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setRegData({
      ...regData,
      [id]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formType === "student") {
      const res = axios.post(
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
        console.log("Success");
      }
    } else {
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
            <select
              name="course"
              id="course"
              onChange={handleChange}
              value={regData.course}
            >
              {courses.map((course) => {
                return <option value={course}>{course}</option>;
              })}
            </select>
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
