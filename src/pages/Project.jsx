import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Topbar from "../components/Topbar";
import toast from "react-hot-toast";
import axios from "axios";
import "../styles/Project.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faFolder,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

export default function Project() {
  const { projectId } = useParams();
  const [project, setProject] = useState({});
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);

  const blurBg = document.querySelector(".blur-bg-project");
  const addFileDialog = document.querySelector(".addFileDialog");
  const addFolderDialog = document.querySelector(".addFolderDialog");

  const openUploadFileForm = () => {
    blurBg.style.display = "flex";
    addFileDialog.style.display = "flex";
  };

  const closeUploadFileForm = () => {
    blurBg.style.display = "none";
    addFileDialog.style.display = "none";
  };

  const openUploadFolderForm = () => {
    blurBg.style.display = "flex";
    addFolderDialog.style.display = "flex";
  };

  const closeUploadFolderForm = () => {
    blurBg.style.display = "none";
    addFolderDialog.style.display = "none";
  };

  useEffect(() => {
    const fetchProjectById = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/projects/get-project-details/${projectId}`
        );
        if (res.data.success) {
          setProject(res.data.project);
        } else {
          setProject({});
        }
      } catch (err) {
        const errorMsg = err.response?.data.message;
        toast.error(errorMsg, {
          duration: 3000,
        });
      }
    };

    const fetchFilesByProject = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/projects/get-files/${projectId}`
        );

        if (res.data.success) {
          setFiles(res.data.files);
        } else {
          setFiles([]);
        }
      } catch (err) {
        const errorMsg = err.response?.data.message;
        toast.error(errorMsg, {
          duration: 3000,
        });
      }
    };

    const fetchFoldersByProject = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/projects/get-folders/${projectId}`
        );

        if (res.data.success) {
          setFolders(res.data.folders);
        } else {
          setFolders([]);
        }
      } catch (err) {
        const errorMsg = err.response?.data.message;
        toast.error(errorMsg, {
          duration: 3000,
        });
      }
    };

    fetchProjectById();
    fetchFilesByProject();
    fetchFoldersByProject();
  }, [projectId]);

  const addFileSubmitHandler = async (e) => {
    e.preventDefault();

    const fileInput = document.querySelector("#fileUpload");
    const file = fileInput.files[0];

    if (!file) {
      toast.error("Please select a file", {
        duration: 3000,
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("id", projectId);

    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/upload/add-file`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message, {
          duration: 3000,
        });
        fileInput.value = "";
      } else {
        toast.error(res.data.message, {
          duration: 3000,
        });
      }
    } catch (err) {
      const errorMsg = err.response?.data.message;
      toast.error(errorMsg, {
        duration: 3000,
      });
    }
    closeUploadFileForm();
  };

  const addFolderSubmitHandler = async (e) => {
    e.preventDefault();

    const folderUpload = document.querySelector("#folderUpload");
    const folderName = folderUpload.value;

    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/upload/add-folder`,
        {
          projectId,
          folderName,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message, {
          duration: 3000,
        });
        folderUpload.value = "";
      } else {
        toast.error(res.data.message, {
          duration: 3000,
        });
      }
    } catch (err) {
      const errorMsg = err.response?.data.message;
      toast.error(errorMsg, {
        duration: 3000,
      });
    }

    closeUploadFolderForm();
  };

  return (
    <>
      <Topbar />
      <div className="project-detail-container mx-auto mt-7 flex flex-col">
        <div className="project-major-details mx-auto mt-2 flex justify-around p-3">
          <div className="project-title">{project.title}</div>
          <div className="project-stack">{project.stack}</div>
          <div className="project-status">{project.status}</div>
        </div>
        <div className="project-files mx-auto mt-3">
          <div className="actions flex justify-around px-5 py-3">
            <div className="addFile" onClick={openUploadFileForm}>
              <FontAwesomeIcon icon={faFile} className="mr-4" /> Add a file
            </div>
            <div className="addFolder" onClick={openUploadFolderForm}>
              <FontAwesomeIcon icon={faFolder} className="mr-4" />
              Add a folder
            </div>
          </div>
          <div className="file-list mx-auto mt-4 p-4">
            {folders.map((folder, index) => (
              <>
                <div
                  className="folder-list-item flex items-center justify-between"
                  key={index}
                >
                  <div className="display-name">
                    <FontAwesomeIcon icon={faFolder} className="mr-4" />{" "}
                    {folder.name}
                  </div>
                </div>
              </>
            ))}
            {files.map((file, index) => (
              <>
                <div className="file-list-item" key={index}>
                  <FontAwesomeIcon icon={faFile} className="mr-4" />
                  {file.originalname}
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
      <div className="blur-bg-project"></div>
      <div className="addFileDialog flex flex-col justify-between items-center">
        <div className="addFileHeader flex justify-between">
          <div className="addFileHeading">Choose a file to upload</div>
          <div className="addFileClose" onClick={closeUploadFileForm}>
            X
          </div>
        </div>
        <form
          onSubmit={addFileSubmitHandler}
          className="addFileForm flex flex-col justify-around items-center"
        >
          <input type="file" name="fileUpload" id="fileUpload" />
          <button type="submit">ADD</button>
        </form>
      </div>
      <div className="addFolderDialog flex flex-col justify-between items-center">
        <div className="addFolderHeader flex justify-between">
          <div className="addFolderHeading">Create a New Folder</div>
          <div className="addFolderClose" onClick={closeUploadFolderForm}>
            X
          </div>
        </div>
        <form
          onSubmit={addFolderSubmitHandler}
          className="addFolderForm flex flex-col justify-around items-center"
        >
          <div className="addFolderInput">
            <label htmlFor="folderUpload">Enter a folder name: </label>
            <input type="text" name="folderUpload" id="folderUpload" />
          </div>
          <button type="submit">ADD</button>
        </form>
      </div>
    </>
  );
}
