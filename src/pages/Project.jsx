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
} from "@fortawesome/free-solid-svg-icons";

export default function Project() {
  const { projectId } = useParams();
  const [project, setProject] = useState({});
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const [fileData, setFileData] = useState([]);

  const blurBg = document.querySelector(".blur-bg-project");
  const addFileDialog = document.querySelector(".addFileDialog");
  const addFolderDialog = document.querySelector(".addFolderDialog");
  const addFolderFileDialog = document.querySelector(".addFolderFileDialog");

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

  const openUploadFolderFileForm = () => {
    blurBg.style.display = "flex";
    addFolderFileDialog.style.display = "flex";
  };

  const closeUploadFolderFileForm = () => {
    blurBg.style.display = "none";
    addFolderFileDialog.style.display = "none";
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

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        let allFiles = [];
        for (const folder of folders) {
          const res = await axios.post(
            `http://localhost:8000/api/v1/projects/get-files-by-ids`,
            { fileIds: folder.files }
          );
          if (res.data.success) {
            allFiles = [...allFiles, ...res.data.files];
          }
        }
        setFileData(allFiles);
      } catch (err) {
        const errorMsg = err.response?.data.message || "Error fetching files";
        toast.error(errorMsg, { duration: 3000 });
      }
    };
    if (folders.length > 0) {
      fetchFiles();
    }
  }, [folders]);

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

  const addFolderFileSubmitHandler = async (e, folderId) => {
    e.preventDefault();

    const folderFileInput = document.querySelector("#folderFileUpload");
    const file = folderFileInput.files[0];

    if (!file) {
      toast.error("Please select a file", {
        duration: 3000,
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("id", folderId);

    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/upload/add-folder-file`,
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
        folderFileInput.value = "";
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
    closeUploadFolderFileForm();
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
                <div className="folder-list-item flex flex-col" key={index}>
                  <div className="folder-desc flex justify-between">
                    <div className="display-name">
                      <FontAwesomeIcon icon={faFolder} className="mr-4" />{" "}
                      {folder.name}
                    </div>
                    <div
                      className="addFileToFolder"
                      onClick={openUploadFolderFileForm}
                    >
                      <FontAwesomeIcon
                        icon={faFile}
                        className="mr-4"
                        cursor="pointer"
                      />
                      Add a file
                    </div>
                  </div>
                  <div className="folder-file-list">
                    {fileData
                      .filter((file) => folder.files.includes(file._id))
                      .map((file, fileIndex) => (
                        <div key={fileIndex} className="pl-3">
                          <FontAwesomeIcon icon={faFile} className="mr-2" />
                          {file.originalname}
                        </div>
                      ))}
                  </div>
                </div>
                <div className="addFolderFileDialog flex flex-col justify-between items-center">
                  <div className="addFolderFileHeader flex justify-between">
                    <div className="addFolderFileHeading">
                      Choose a file to upload
                    </div>
                    <div
                      className="addFolderFileClose"
                      onClick={closeUploadFolderFileForm}
                    >
                      X
                    </div>
                  </div>
                  <form
                    onSubmit={(e) => addFolderFileSubmitHandler(e, folder._id)}
                    className="addFolderFileForm flex flex-col justify-around items-center"
                  >
                    <input
                      type="file"
                      name="folderFileUpload"
                      id="folderFileUpload"
                    />
                    <button type="submit">ADD</button>
                  </form>
                </div>
              </>
            ))}
            {files.map((file, index) => (
              <>
                <div className="file-list-item" key={index}>
                  <FontAwesomeIcon icon={faFile} className=" pl-3 mr-4" />
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
