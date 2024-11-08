import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import "../styles/MyProjects.css";
import { useNavigate, useParams } from "react-router";
import Topbar from "../components/Topbar";

export default function ViewAllProjects() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const { course } = useParams();
  const [allProjects, setAllProjects] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchProjectByCourse = async (req, res) => {
      try {
        const projectsRes = await axios.get(
          `http://localhost:8000/api/v1/projects/get-projects/${course}`
        );

        if (projectsRes.data.success) {
          setAllProjects(projectsRes.data.projects);
        } else {
          setAllProjects([]);
        }
      } catch (err) {
        const errorMsg = err.response?.data.message;
        toast.error(errorMsg, {
          duration: 3000,
        });
      }
    };

    fetchProjectByCourse();
  });

  return (
    <>
      <Topbar />
      <div className="my-project-container mx-auto p-5">
        <div className="mproject-heading flex justify-around">
          <div className="mproject-title">Project Title</div>
          <div className="mproject-stack">Project Stack</div>
          <div className="mproject-stack">No. of members</div>
        </div>
        <div className="mproject-content flex flex-col justify-between">
          {allProjects.map((project) => (
            <>
              <div className="project-row flex justify-around">
                <div className="mproject-title">{project.title}</div>
                <div className="mproject-stack">{project.stack}</div>
                <div className="mproject-numMem">{project.numOfMembers}</div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}
