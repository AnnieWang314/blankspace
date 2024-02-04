import React from "react";

function redirectToHome() {
    window.location.href = "/";
}

const NotFound = () => {
  return (
    <div className="Unauth-container">
        <h1>401 Unauthorized</h1>
        <p>Oops! Sorry, you are not authorized to access this page...</p>
        <button clasName="Unauth-redirect-button" onclick="redirectToHome()">Click here to redirect to the Home Page</button>
    </div>

  );
};

export default NotFound;
