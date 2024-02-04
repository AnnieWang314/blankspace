import React, { useState } from 'react';

import "../../utilities.css";
import "./Editor.css";

const Editor = ({ userId }) => {
  const [text, setText] = useState('');

  const handleInputChange = (event) => {
    setText(event.target.value);
    autoExpand(event.target);
  };

  const autoExpand = (textarea) => {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const updateTitle = (event) => {
    document.title = event.target.innerText || 'Untitled Page';
  };

  const toggleSidebar = () => {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = sidebar.style.display === 'none' ? 'block' : 'none';
  };
  return (
    <>
      <header>
      <div className="Editor-header"></div>
        <h1 id="pageTitle" contentEditable={true} onInput={updateTitle}>Untitled Page</h1>
        <div className="Editor-header h1"></div>
      </header>

      <main>
        <div className="Editor-textbox-container">
          <textarea
            className="Editor-textbox"
            placeholder="Start typing here..."
            value={text}
            onChange={handleInputChange}
          ></textarea>
          <div className="Editor-end-label"></div>
        </div>
        
      </main>
    </>
  );

};

export default Editor;
