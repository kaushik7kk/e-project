import React from "react";
import { useParams } from "react-router";
import Topbar from "../components/Topbar";
import "../styles/Course.css";

export default function Course() {
  const { course, uni } = useParams();

  return (
    <>
      <Topbar />
      <div className="project-container mx-auto flex justify-start">
        <div className="side-actions flex flex-col items-center p-10 text-center">
          <div className="action p-5">Add a project</div>
          <div className="action mt-5 p-5">Delete a project</div>
          <div className="action mt-5 p-5">View projects</div>
          <div className="action mt-5 p-5">My project</div>
        </div>
        <div className="projects flex flex-col justify-between items-center text-center">
            <div className="headings">
                <div className="uni-heading">{uni === "DU" ? "Delhi University" : "Indraprastha University"}</div>
                <div className="course-heading">{course}</div>
            </div>
            .
        </div>
      </div>
    </>
  );
}
