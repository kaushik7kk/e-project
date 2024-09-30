import React from "react";
import Topbar from "../components/Topbar.jsx";
import "../styles/Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Topbar />
      <div className="home-container mx-auto flex justify-between p-5">
        <div className="intro-text my-auto">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe minima
          nihil ducimus unde culpa quisquam hic ut atque, aspernatur ea et rem
          impedit. Sed fugit sequi velit voluptas commodi nisi voluptate quis
          quisquam quo, blanditiis repellendus ex minus laboriosam mollitia.
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe minima
          nihil ducimus unde culpa quisquam hic ut atque, aspernatur ea et rem
          impedit. Sed fugit sequi velit voluptas commodi nisi voluptate quis
          quisquam quo, blanditiis repellendus ex minus laboriosam mollitia.
        </div>
        <div className="links flex flex-col justify-between items-center p-5 my-auto">
          <Link to={`/register`} className="p-2 text-center">
            Register
          </Link>
          <Link to={`/login`} className="p-2 text-center">
            Login
          </Link>
        </div>
      </div>
    </>
  );
}
