import React, { useEffect, useMemo, useState } from "react";
import "../../styles/RegisterForm.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { login } from "../../store/authReducer";
import { useNavigate } from "react-router";

export default function LoginForm() {
  const initialLoginData = useMemo(
    () => ({
      email: "",
      password: "",
    }),
    []
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate])

  const formType = useSelector((state) => state.form);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    setLoginData({
      ...initialLoginData,
    });
  }, [formType, initialLoginData]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    setLoginData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    let res;
      try {
        if (formType === "student") {
          res = await axios.post(
            "http://localhost:8000/api/v1/auth/login/student",
            {
              email: loginData.email,
              password: loginData.password,
            }
          );
        } else {
          res = await axios.post(
            "http://localhost:8000/api/v1/auth/login/teacher",
            {
              email: loginData.email,
              password: loginData.password,
            }
          );

        }

        if (res.data.success) {
          localStorage.setItem("authToken", res.data.token);
          if (formType === "student") {
            localStorage.setItem("userType", "student");
          } else {
            localStorage.setItem("userType", "teacher");
          }
          toast.success(res.data.message, {
            duration: 3000,
          });
          dispatch(login({
            token: res.data.token,
            userType: localStorage.getItem("userType")
          }));
        } else {
          toast.error(res.data.message, {
            duration: 3000,
          });
        }
      } catch (error) {
        const errMsg = error?.response.data.message;
        toast.error(errMsg, {
          duration: 3000,
        });
      }
    
  };

  return (
    <>
      <>
        <div className="form-container mx-auto mt-7 flex flex-col items-center">
          <div className="form-heading mt-4 noto-sans-warang-citi-regular">
            {formType === "teacher" ? `Teacher Login` : `Student Login`}
          </div>
          <form action="" className="mt-5" onSubmit={handleLoginSubmit}>
            <div className="input-group flex justify-between items-center">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                placeholder="Enter email..."
                id="email"
                className="mx-4 my-3 p-2"
                value={loginData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group flex justify-between items-center">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                placeholder="Enter password..."
                id="password"
                className="mx-4 my-3 p-2"
                value={loginData.password}
                onChange={handleInputChange}
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
