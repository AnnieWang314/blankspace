import React, { useState } from "react";
import { get, post } from "../../utilities";

// import {
//   GoogleOAuthProvider,
//   GoogleLogin,
//   googleLogout,
// } from "@react-oauth/google";

import "../../utilities.css";
import "./Description.css";

// //TODO: REPLACE WITH YOUR OWN CLIENT_ID
// const GOOGLE_CLIENT_ID = "FILL ME IN";


const Description = ({ project, setProject, userId }) => {
  const [title, setTitle] = useState("");
  const [purpose, setPurpose] = useState("");


  const handleSubmit = () => {
    post("/api/createproject", { name: title, purpose: purpose, userId: userId }).then((response) => {
      setProject(response.newProject);
      console.log(`updated projects ${project}`);
    });
  };
  
  return (
    <div>
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
         onChange={(e) => setTitle(e.target.value)}
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
            onChange={(e) => setPurpose(e.target.value)}
          ></textarea>
        </div>
      </div>
      </div>
      <p>
        <button id="submitBtn" className="Description-submit-button" onClick={handleSubmit}>
          Submit
        </button>
      </p>
    </div>
  )
};

export default Description;
