import React from "react";
import "../styles/Topbar.css";
import { Link } from "react-router-dom";

export default function Topbar() {
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
