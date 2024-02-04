import React from "react";
// import {
//   GoogleOAuthProvider,
//   GoogleLogin,
//   googleLogout,
// } from "@react-oauth/google";

import "../../utilities.css";
import "./Home.css";
import Logo from "../../Logo.png";

// //TODO: REPLACE WITH YOUR OWN CLIENT_ID
// const GOOGLE_CLIENT_ID = "FILL ME IN";



const Home = ({ userId }) => {
  return (
    <div className="Home-container Home-body">
      <h1>Welcome!</h1>
      <div>Unleash the power of AI to effortlessly complete your thoughts and elevate your writing! Experience a new era of creativity with our intelligent text autocomplete—where innovation meets expression effortlessly.
      </div>
      <img src={Logo} alt="Logo" className="Home-logo" />
      <button id="loginBtn" className="Home-login-btn">Login</button>
    </div>
  )
};

export default Home;
