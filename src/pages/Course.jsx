import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Topbar from "../components/Topbar";
import "../styles/Course.css";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Course() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userData = useSelector((state) => state.auth.user);
  const { course, uni } = useParams();
  const [students, setStudents] = useState([]);
  const userType = useSelector((state) => state.auth.userType);

  const roles = ["Developer", "Designer", "Leader", "Tester"];
  const [numMembers, setNumMembers] = useState(1);
  const [entries, setEntries] = useState([{ userId: "", role: "" }]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/course/get-users/${course}`
        );

        if (res.data.success) {
          setStudents(res.data.studentProjectData);
        } else {
          console.error(res.data.message);
        }
      } catch (err) {
        let errMsg = err.response?.data.message;
        console.log(errMsg);
      }
    };
    fetchUsers();
  }, [course]);

  const handleNumMembersChange = (e) => {
    const count = parseInt(e.target.value, 10);
    setNumMembers(count);
    setEntries(Array(count).fill({ userId: '', role: '' }));
  };

  const handleChange = (index, field, value) => {
    const updatedEntries = entries.map((entry, i) =>
      i === index ? { ...entry, [field]: value } : entry
    );
    setEntries(updatedEntries);
  };

  const availableStudents = (selectedIndex) => {
    const selectedUserIds = entries.map((entry, index) => index !== selectedIndex && entry.userId);
    return students.filter(student => !selectedUserIds.includes(student.userId));
  };

  const availableRoles = (selectedIndex) => {
    const selectedRoles = entries.map((entry, index) => index !== selectedIndex && entry.role);
    return roles.filter(role => !selectedRoles.includes(role));
  };

  const studentCourse = (
    <>
      <Topbar />
      <div className="project-container mx-auto flex justify-start">
        <div className="side-actions flex flex-col items-center p-10 text-center">
          {course === userData.course ? (
            <>
              <div id="add-project" className="action p-5">
                Add a project
              </div>
              <div id="delete-project" className="action mt-5 p-5">
                Delete a project
              </div>
              <div id="my-projects" className="action mt-5 p-5">
                My projects
              </div>
            </>
          ) : (
            <></>
          )}
          <div id="view-projects" className="action mt-5 p-5">
            View all projects
          </div>
        </div>
        <div className="projects flex flex-col justify-between items-center text-center">
          <div className="headings">
            <div className="uni-heading">
              {uni === "DU" ? "Delhi University" : "Indraprastha University"}
            </div>
            <div className="course-heading">{course}</div>
          </div>
          <div className="student-table">
            <div className="table-heading flex justify-between">
              <div className="sno">S.No</div>
              <div className="sname">Student Name</div>
              <div className="sproject">Project</div>
            </div>
            <div className="student-data flex flex-col">
              {students.map((student, index) => (
                <div key={index} className="data-row flex justify-between mt-4">
                  <div className="sno">{index + 1}</div>
                  <div className="sname">{student.sname}</div>
                  <div className="sproject">
                    {student.ptitle === undefined ||
                    student.ptitle === null ||
                    student.ptitle === "" ||
                    student.ptitle === "undefined"
                      ? "No project"
                      : student.ptitle}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="blur-bg"></div>
      <form className="addProject flex flex-col p-6">
        <div className="addHeader flex justify-between mb-7">
          <div className="formHeading">Add Project</div>
          <div className="close-icon">X</div>
        </div>
        <div className="add-input-group flex justify-between">
          <label htmlFor="ptitle">Project Title:</label>
          <input type="text" id="ptitle" name="ptitle" />
        </div>
        <div className="add-input-group flex justify-between mt-5">
          <label htmlFor="pstack">Project Stack:</label>
          <input type="text" id="pstack" name="pstack" />
        </div>
        <div className="add-input-group flex justify-between mt-5">
          <label htmlFor="numMem">Number of members:</label>
          <input
            type="number"
            id="numMem"
            name="numMem"
            min={1}
            max={5}
            value={numMembers}
            onChange={handleNumMembersChange}
          />
        </div>
      <div className="dropdowns flex flex-col mt-5">
        <label>Add member</label>
        {entries.map((entry, index) => (
          <div key={index} className="entry flex justify-between mt-2">
            <select
              value={entry.userId}
              onChange={(e) => handleChange(index, 'userId', e.target.value)}
            >
              <option value="">Select a student</option>
              {availableStudents(index).map((student) => (
                <option key={student.userId} value={student.userId}>
                  {student.sname}
                </option>
              ))}
            </select>

            <select
              value={entry.role}
              onChange={(e) => handleChange(index, 'role', e.target.value)}
            >
              <option value="">Select a role</option>
              {availableRoles(index).map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <div className="add-input-group flex justify-between mt-5">
          <label htmlFor="pmentor">Project Mentor:</label>
          <select name="pmentor" id="pmentor">
            <option value="">Az By</option>
          </select>
        </div>
        <button className="pSubmit" type="submit">Add Project</button>
      </form>
    </>
  );

  if (userType === "student") return studentCourse;

  const teacherCourse = (
    <>
      <Topbar />
      <div className="project-container mx-auto flex justify-start">
        <div className="side-actions flex flex-col items-center p-10 text-center">
          {userData.course.includes(course) ? (
            <>
              <div id="mentor-projects" className="action mt-5 p-5">
                Mentored projects
              </div>
            </>
          ) : (
            <></>
          )}
          <div id="view-projects" className="action mt-5 p-5">
            View all projects
          </div>
        </div>
        <div className="projects flex flex-col justify-between items-center text-center">
          <div className="headings">
            <div className="uni-heading">
              {uni === "DU" ? "Delhi University" : "Indraprastha University"}
            </div>
            <div className="course-heading">{course}</div>
          </div>
          <div className="student-table">
            <div className="table-heading flex justify-between">
              <div className="sno">S.No</div>
              <div className="sname">Student Name</div>
              <div className="sproject">Project</div>
            </div>
            <div className="student-data flex flex-col">
              {students.map((student, index) => (
                <div key={index} className="data-row flex justify-between mt-4">
                  <div className="sno">{index + 1}</div>
                  <div className="sname">{student.sname}</div>
                  <div className="sproject">
                    {student.ptitle === undefined ||
                    student.ptitle === null ||
                    student.ptitle === "" ||
                    student.ptitle === "undefined"
                      ? "No project"
                      : student.ptitle}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  if (userType === "teacher") return teacherCourse;
}
