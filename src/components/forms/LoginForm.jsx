import React from "react";
import "../../styles/RegisterForm.css";

export default function LoginForm(props) {
  return (
    <>
      <>
        <div className="form-container mx-auto mt-20 flex flex-col items-center">
          <div className="form-heading mt-4 noto-sans-warang-citi-regular">
            {props.type === "teacher"
              ? `Teacher Login`
              : `Student Login`}
          </div>
          <form action="" className="mt-5">
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
            <div className="input-group flex justify-center mt-2">
              <button
                type="submit"
                className="p-4 noto-sans-warang-citi-regular"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </>
    </>
  );
}
