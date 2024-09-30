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
    university: "ipu",
    course: "mca",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setRegData({
      ...regData,
      [id]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    
  }

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
              <option value="ipu">IPU</option>
              <option value="du">DU</option>
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
              <option value="mca">MCA</option>
              <option value="bca">BCA</option>
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
