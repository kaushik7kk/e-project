import React from "react";
import "../styles/Topbar.css";
import { Link } from "react-router-dom";

export default function Topbar() {
  return (
    <>
      <div className="topbar-container mx-auto flex justify-between p-5">
        <Link to="/" className="brand text-orange-600 gowun-batang-bold">
          e-Project
        </Link>
        <Link to="/register" className="top-links text-center">
          Create Account
        </Link>
      </div>
    </>
  );
}
