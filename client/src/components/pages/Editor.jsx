import React, { useState, useEffect } from "react";
import Project from "../../../../server/models/project";
import { get, post } from "../../utilities";
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
        <div className="Editor-header"></div>
        <h1 className="Editor-title">{title}</h1>
        <div className="Editor-header"></div>
      </header>

      <div className="Editor-bottom">
        <div className="Editor-sidebar-container">
          <div className="Editor-sidebar">
            {allProjects.map((project) => (
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