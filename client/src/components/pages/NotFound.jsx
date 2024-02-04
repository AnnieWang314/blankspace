import React from "react";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div class="NotFound-container">
      <h1>404 Not Found</h1>
      <p className="NotFound-p">
        Oops! Sorry, it seems like the page you requested does not exist on our server...
      </p>
    </div>
  );
};

export default NotFound;
