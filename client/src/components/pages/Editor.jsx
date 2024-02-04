import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import "../../utilities.css";
import "./Editor.css";

const Editor = ({ userId, currentProject }) => {
  // const myProject = new Project("", "", "");
  const navigate = useNavigate();
  const [allProjects, setAllProjects] = useState([]);

  useEffect(() => {
    if (!userId) {
      navigate("/unauth");
    }

    console.log("preparing to fetch");
    get("/api/allprojects", { userId: userId })
      .then((response) => {
        setAllProjects(response.projects);
        console.log("got all projects");
      })
      .catch((error) => {
        console.error("Failed to fetch all projects:", error);
      });
  }, [userId, navigate]);

  const handleKeyDown = (event) => {
    if (event.key === " ") {
      post("/api/text", { projectId: "123", newText: event.target.value }).then((response) => {
        setProject(response.updatedProject);
        console.log(`updated projects ${project}`);
      });
    }
  };

  const toggleSidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = sidebar.style.display === "none" ? "block" : "none";
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
        <div className="Editor-logout-button">Logout</div>
        <h1 className="Editor-title">title</h1>
        <div className="Editor-header"></div>
      </header>

      <div className="Editor-bottom">
        <div className="Editor-sidebar-container">
          <div className="Editor-sidebar">
            {allProjects &&
              allProjects.map((project) => (
                <div key={project.id} className="Editor-project">
                  {project.name}
                </div>
              ))}
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
