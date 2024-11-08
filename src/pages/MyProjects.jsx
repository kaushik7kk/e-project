import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Topbar from "../components/Topbar";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/MyProjects.css";

export default function MyProjects() {
  const userType = useSelector((state) => state.auth.userType);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userData = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (!isAuthenticated || userType === "teacher") {
      navigate("/");
    }
  }, [isAuthenticated, navigate, userType]);

  useEffect(() => {
    if (userData && userData._id) {
      const getProjectsById = async () => {
        try {
          const projectsRes = await axios.get(
            `http://localhost:8000/api/v1/projects/get-my-projects/${userData._id}`
          );
          console.log(projectsRes);
          if (projectsRes.data.success) {
            setProjects(projectsRes.data.projects);
          } else {
            setProjects([]);
          }
        } catch (err) {
          const errorMsg =
            err.response?.data.message || "Error fetching projects";
          toast.error(errorMsg, { duration: 3000 });
        }
      };
      getProjectsById();
    }
  }, [userData]);

  return (
    <>
      <Topbar />
      <div className="my-project-container mx-auto p-5">
        <div className="mproject-heading flex justify-around">
          <div className="mproject-title">Project Title</div>
          <div className="mproject-stack">Project Stack</div>
        </div>
        <div className="mproject-content flex flex-col justify-between">
          {projects.map((project) => (
            <>
              <div className="project-row flex justify-around">
                <div className="mproject-title">{project.title}</div>
                <div className="mproject-stack">{project.stack}</div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}
