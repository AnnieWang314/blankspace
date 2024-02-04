import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import jwt_decode from "jwt-decode";

import NotFound from "./pages/NotFound.jsx";
import Home from "./pages/Home.jsx";
import Editor from "./pages/Editor.jsx";
import Description from "./pages/Description.jsx";
import Copyright from "./Copyright.jsx";
import Unauth from "./pages/Unauth.jsx";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities.js";

/**
 * Define the "App" component
 */
const App = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(undefined);
  const [currentProject, setCurrentProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    get("/api/whoami")
      .then((user) => {
        if (user._id) {
          // they are registed in the database, and currently logged in.
          setUserId(user._id);
        }
      })
      .then(() =>
        socket.on("connect", () => {
          post("/api/initsocket", { socketid: socket.id });
        })
      )
      .finally(() => setIsLoading(false));
  }, []);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken })
      .then((user) => {
        setUserId(user._id);
        post("/api/initsocket", { socketid: socket.id });
      })
      .then(() => {
        navigate("/editor");
      });
  };

  const handleLogout = () => {
    setUserId(undefined);
    navigate("/");
    post("/api/logout");
  };

  if (isLoading) {
    return <div className="App-container"></div>;
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Home handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />}
        />
        <Route
          path="/description"
          element={<Description userId={userId} setCurrentProject={setCurrentProject} />}
        />
        <Route path="/unauth" element={<Unauth />} />          
        <Route
          path="/editor"
          element={
            <Editor
              userId={userId}
              currentProject={currentProject}
              setCurrentProject={setCurrentProject}
              handleLogout={handleLogout}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Copyright />
    </>
  );
};

export default App;