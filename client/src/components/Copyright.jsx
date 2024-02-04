import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "./Copyright.css";

const Copyright = () => {
  return (
    <div className="Copyright-content">
      made with&nbsp;<FontAwesomeIcon icon={faHeart} />&nbsp; by SAKE
    </div>
  );
};

export default Copyright;
