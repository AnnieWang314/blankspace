import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
<<<<<<< HEAD
import "../../utilities.css";
import "./Editor.css";

const Editor = ({ userId, title }) => {
  // const myProject = new Project("", "", "");
  const [project, setProject] = useState();
  const [allProjects, setAllProjects] = useState([
    {
      id: 1,
      name: "My Essay",
      purpose: "I want to write a reflection about my MIT interview",
      text: "",
    },
    { id: 2, name: "Frankenstein", purpose: "I want to summarize the book", text: "" },
    {
      id: 3,
      name: "Job Interview",
      purpose: "I want to write a cover letter for a job interview",
      text: "",
    },
    {
      id: 4,
      name: "Frankenstein asdlfjaoisfj asodfjaosdjoadisjfoais",
      purpose: "I want to summarize the book",
      text: "",
    },
    { id: 5, name: "Frankenstein", purpose: "I want to summarize the book", text: "" },
    { id: 6, name: "Frankenstein", purpose: "I want to summarize the book", text: "" },
    { id: 7, name: "Frankenstein", purpose: "I want to summarize the book", text: "" },
    { id: 8, name: "Frankenstein", purpose: "I want to summarize the book", text: "" },
    { id: 9, name: "Frankenstein", purpose: "I want to summarize the book", text: "" },
    { id: 10, name: "Frankenstein", purpose: "I want to summarize the book", text: "" },
    { id: 11, name: "Frankenstein", purpose: "I want to summarize the book", text: "" },
    { id: 12, name: "Frankenstein", purpose: "I want to summarize the book", text: "" },
    { id: 13, name: "Frankenstein", purpose: "I want to summarize the book", text: "" },
  ]);

  console.log(allProjects);
=======
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import "../../utilities.css";
import "./Editor.css";

const Editor = ({ userId, currentProject, setCurrentProject, handleLogout }) => {
  // const myProject = new Project("", "", "");
  const navigate = useNavigate();
  const [allProjects, setAllProjects] = useState([]);
>>>>>>> ca8f4651c966234ae0ba0124ef552ddd80d9e5f2

  useEffect(() => {
    if (!userId) {
      navigate("/unauth");
    } else {
      console.log("preparing to fetch");
      get("/api/allprojects", { userId: userId })
        .then((response) => {
          setAllProjects(response.projects);
          console.log(response.projects);
          console.log("got all projects");
        })
        .catch((error) => {
          console.error("Failed to fetch all projects:", error);
        });
    }
  }, [userId, navigate]);
  const handleKeyDown = (event) => {
    if (event.key === " ") {
      post("/api/text", { projectId: "123", newText: event.target.value }).then((response) => {
        setCurrentProject(response.updatedProject);
        console.log(`updated projects ${project}`);
      });
    }
  };

  const toggleSidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = sidebar.style.display === "none" ? "block" : "none";
  };

  const handleProjectClick = (projectId) => {
    get("/api/project", { projectId: projectId }).then((response) => {
      setCurrentProject(response.project);
      console.log(response.project);
    });
  };

  return (
    <div className="Editor-container">
      <header>
        <div className="Editor-plus">
          <Link to="/description">
            <div>
              <FontAwesomeIcon icon={faCirclePlus} size="3x" style={{ color: "#1a4672" }} />
            </div>
          </Link>
        </div>
        <div className="Editor-header"></div>
        <div className="Editor-logout-button" onClick={handleLogout}>
          Logout
        </div>
        <h1 className="Editor-title">
          {currentProject ? currentProject.name : "no project selected"}
        </h1>
        <div className="Editor-header"></div>
      </header>

      <div className="Editor-bottom">
        <div className="Editor-sidebar-container">
          <div className="Editor-sidebar">
<<<<<<< HEAD
            {allProjects.map((project) => (
              <div key={project.id} className="Editor-project">
                {project.name}
              </div>
            ))}
=======
            {allProjects &&
              allProjects.map((project) => (
                <div
                  key={project._id}
                  className="Editor-project"
                  onClick={() => {
                    handleProjectClick(project._id);
                  }}
                >
                  {project.name || "Unnamed Project"}
                </div>
              ))}
>>>>>>> ca8f4651c966234ae0ba0124ef552ddd80d9e5f2
          </div>
        </div>
        <div className="Editor-textbox-container">
          <textarea
            className="Editor-textbox"
            placeholder="Start typing here..."
            // value={text}
            onChange={handleKeyDown}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Editor;