import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import "../../utilities.css";
import "./Editor.css";

const Editor = ({ userId, currentProject, setCurrentProject, handleLogout }) => {
  const navigate = useNavigate();
  const [allProjects, setAllProjects] = useState([]);
  const [currentText, setCurrentText] = useState(""); // Track the current text in the textarea

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

  useEffect(() => {
    if (currentProject) {
      setCurrentText(currentProject.text);
    } else {
      setCurrentText(""); // Set to empty when no currentProject
    }
  }, [currentProject]);

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  const saveText = debounce(() => {
    post("/api/text", { projectId: currentProject._id, newText: currentText })
      .then((response) => {
        setCurrentProject(response.updatedProject);
        setCurrentText(response.updatedProject.text);
        console.log(`Project updated: ${response.updatedProject.name}`);
      })
      .catch((error) => console.error("Failed to save text", error));
  }, 500);

  const handleKeyDown = (event) => {
    saveText();
    if (event.key === " ") {
      console.log("chat thing");
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
          </div>
        </div>
        <div className="Editor-textbox-container">
          <textarea
            className="Editor-textbox"
            placeholder="Start typing here..."
            value={currentText}
            onChange={(event) => setCurrentText(event.target.value)}
            onKeyDown={handleKeyDown}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Editor;
