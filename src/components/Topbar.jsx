import React from "react";
import "../styles/Topbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUserData, tempLogout } from "../store/authReducer";
import toast from "react-hot-toast";

export default function Topbar() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutCilckHandler = () => {
    dispatch(tempLogout());
    navigate("/");
    toast.success("Logged out successfully", {
      duration: 3000,
    });
    setTimeout(() => {
      dispatch(clearUserData());
    }, 100);
  };

  if (isAuthenticated) {
    return (
      <>
        <div className="topbar-container mx-auto flex justify-between p-5">
          <Link to="/" className="brand gowun-batang-bold">
            e-Project
          </Link>
          <Link
            onClick={logoutCilckHandler}
            className="brand gowun-batang-bold"
          >
            Logout
          </Link>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="topbar-container mx-auto flex justify-center p-5">
          <Link to="/" className="brand gowun-batang-bold">
            e-Project
          </Link>
        </div>
      </>
    );
  }
}
