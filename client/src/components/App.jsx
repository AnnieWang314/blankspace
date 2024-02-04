import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import jwt_decode from "jwt-decode";

import NotFound from "./pages/NotFound.jsx";
import Home from "./pages/Home.jsx";
import Editor from "./pages/Editor.jsx";
import Description from "./pages/Description.jsx";
import Copyright from "./Copyright.jsx";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities.js";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);
  const [title, setTitle] = useState("asdf");

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  }, []);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Home handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />}
        />
        <Route
        path="/description"
        element={
          <Description
            // handleLogin={handleLogin}
            // handleLogout={handleLogout}
            userId={userId}
          />
        }
      /> 
        <Route path="/editor" element={<Editor userId={userId} title={title} />} />
        <Route path="/unauth" element={<Editor userId={userId} title={title} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Copyright />
    </>
  );
};

export default App;