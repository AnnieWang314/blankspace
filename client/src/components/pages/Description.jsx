import React from "react";
// import {
//   GoogleOAuthProvider,
//   GoogleLogin,
//   googleLogout,
// } from "@react-oauth/google";

import "../../utilities.css";
import "./Description.css";

// //TODO: REPLACE WITH YOUR OWN CLIENT_ID
// const GOOGLE_CLIENT_ID = "FILL ME IN";



const Description = ({ userId }) => {
  return (
    <div className="Description-container">
      <h1>Start</h1>
      <div className="Description-title">
        Title:
        <div className="Description-textbox-container">
        <input type="text" id="titeTextbox" className="Description-textbox" placeholder="Enter title here..." />
        </div>
      </div>
      <div>
        <div className="Description-title">
          Purpose:
        <div className="Description-textbox-container">
          <textarea id="purposeTextbox" className="Description-textbox" placeholder="What do you want to write about?"></textarea>
        </div>
      </div>
      </div>
      <p>
        <button id="submitBtn" className="Description-submit-button">Submit</button>
      </p>
    </div>
  )
};

export default Description;
