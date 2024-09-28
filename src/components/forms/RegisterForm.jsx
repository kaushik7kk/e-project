import React, { useState } from "react";
import "../../styles/RegisterForm.css";
import { useSelector } from "react-redux";

export default function RegisterForm() {
  const formType = useSelector((state) => state.form);

  const [regData, setRegData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    phone: "",
    university: "",
    course: "",
  })

  return (
    <>
      <div className="form-container mx-auto flex flex-col items-center">
        <div className="form-heading mt-4 noto-sans-warang-citi-regular">
          {formType === "teacher"
            ? `Teacher Registration`
            : `Student Registration`}
        </div>
        <form action="" className="mt-5">
          <div className="input-group flex justify-between items-center">
            <label htmlFor="fname">First Name:</label>
            <input
              type="text"
              placeholder="Enter first name..."
              id="fname"
              className="mx-4 my-3 p-2"
            />
          </div>
          <div className="input-group flex justify-between items-center">
            <label htmlFor="lname">Last Name:</label>
            <input
              type="text"
              placeholder="Enter last name..."
              id="lname"
              className="mx-4 my-3 p-2"
            />
          </div>
          <div className="input-group flex justify-between items-center">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              placeholder="Enter email..."
              id="email"
              className="mx-4 my-3 p-2"
            />
          </div>
          <div className="input-group flex justify-between items-center">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              placeholder="Enter password..."
              id="password"
              className="mx-4 my-3 p-2"
            />
          </div>
          <div className="input-group flex justify-between items-center">
            <label htmlFor="phone">Phone:</label>
            <input
              type="number"
              placeholder="Enter phone number..."
              id="phone"
              className="mx-4 my-3 p-2"
            />
          </div>
          <div className="input-group flex justify-between items-center">
            <label htmlFor="university">University:</label>
            <input
              type="text"
              placeholder="Enter university..."
              id="university"
              className="mx-4 my-3 p-2"
            />
          </div>
          <div className="input-group flex justify-between items-center">
            <label htmlFor="Course">Course:</label>
            <input
              type="text"
              placeholder="Enter course..."
              id="course"
              className="mx-4 my-3 p-2"
            />
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
