import React from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import "../../utilities.css";
import "./Home.css";
import Logo from "../../logo.png";

const GOOGLE_CLIENT_ID = "943851846926-m4juvtu2pfc05sfu4q8jal5fe49f9s06.apps.googleusercontent.com";

const Home = ({ handleLogin, handleLogout, userId }) => {
  return (
    <div className="Home-container">
      <h1>Welcome!</h1>
      <div>
        Unleash the power of AI to effortlessly complete your thoughts and elevate your writing!
        Experience a new era of creativity with our intelligent text autocomplete—where innovation
        meets expression seamlessly.
      </div>
      <img src={Logo} alt="Logo" className="Home-logo" />
      <div className="Home-title">blank[space]</div>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        {userId ? (
          <button
            onClick={() => {
              googleLogout();
              handleLogout();
            }}
          >
            Logout
          </button>
        ) : (
          <GoogleLogin
            width="14px"
            size="large"
            onSuccess={handleLogin}
            onError={(err) => console.log(err)}
          />
        )}
      </GoogleOAuthProvider>
    </div>
  );
};

export default Home;