import React from "react";
import { useNavigate } from 'react-router-dom';

function MyComponent({ handleLogin, handleLogout, userId }) {
  const navigate = useNavigate();

  const redirectToHome = () => {
    navigate('/');
  };

  const Unauth = () => {
    return (
      <div className="Unauth-container">
        <h1>401 Unauthorized</h1>
        <p>Oops! Sorry, you are not authorized to access this page...</p>
        <button className="Unauth-redirect-button" onClick={redirectToHome}>
          Click here to redirect to the Home Page
        </button>
      </div>
    );
  };

  return <Unauth />;
}

export default MyComponent;
