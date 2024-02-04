import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { get, post } from "../../utilities";
import "../../utilities.css";
import "./Description.css";

const Description = ({ userId, setCurrentProject }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [purpose, setPurpose] = useState("");

  useEffect(() => {
    if (!userId) {
      navigate("/unauth");
    }
  }, [userId, navigate]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handlePurposeChange = (event) => {
    setPurpose(event.target.value);
  };

  const handleSubmit = () => {
    const projectData = {
      name: title,
      purpose: purpose,
      userId: userId, // Ensure you have the userId from props or some global state
    };

    // Send POST request to your API endpoint
    post("/api/createproject", projectData)
      .then((response) => {
        // Handle success response, maybe clear form or show a success message
        setCurrentProject(response.newProject);
        console.log("Project created successfully:", response.newProject);
        // Optionally, reset the form fields
        setTitle("");
        setPurpose("");
      })
      .then(() => {
        navigate("/editor");
      })
      .catch((error) => {
        // Handle errors, maybe show an error message to the user
        console.error("Error creating project:", error);
      });
  };

  return (
    <div className="Description-container">
      <h1>Start</h1>
      <div className="Description-title">
        Title:
        <div className="Description-textbox-container">
          <input
            type="text"
            id="titeTextbox"
            className="Description-textbox"
            placeholder="Enter title here..."
            value={title}
            onChange={handleTitleChange}
          />
        </div>
      </div>
      <div>
        <div className="Description-title">
          Purpose:
          <div className="Description-textbox-container">
            <textarea
              id="purposeTextbox"
              className="Description-textbox"
              placeholder="What do you want to write about?"
              value={purpose}
              onChange={handlePurposeChange}
            ></textarea>
          </div>
        </div>
      </div>
      <p>
        <button onClick={handleSubmit} className="Description-submit-button">
          Submit
        </button>
      </p>
    </div>
  );
};

export default Description;