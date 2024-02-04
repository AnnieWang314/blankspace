import React, { useState, useEffect } from "react";
import Project from "../../../../server/models/project";
import { get, post } from "../../utilities";

import "../../utilities.css";
import "./Editor.css";

const Editor = ({ userId, title }) => {
  const myProject = new Project("", "", "");
  const [project, setProject] = useState();
  const [allProjects, setAllProjects] = useState([]);

  useEffect(() => {
    if (userId) {
      // Make sure userId is not undefined
      get("/allprojects", { userId: userId })
        .then((response) => {
          setAllProjects(response.projects);
          console.log("got all projects");
        })
        .catch((error) => {
          console.error("Failed to fetch all projects:", error);
        });
    } else {
      console.log("No userId provided");
    }
  }, [userId]);

  const handleInputChange = (event) => {
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
        <div className="Editor-header"></div>
        <h1 className="Editor-title">{title}</h1>
        <div className="Editor-header"></div>
      </header>

      <div className="Editor-bottom">
        <div className="Editor-textbox-container">
          <textarea
            className="Editor-textbox"
            placeholder="Start typing here..."
            // value={text}
            onChange={handleInputChange}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Editor;
