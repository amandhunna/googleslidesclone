import React, { useEffect, useState } from 'react';
import './App.css';
import "./css"
import { Header, SideBar, Editor } from "./components";

function App() {
  const [src, setSRC] = useState();
  const [textArea, setTextArea] = useState([]);
  const [images, setImages] = useState([]);
  const [slide, setNewSlide] = useState([{ pageNumber: 1, uValue: 1 }, { pageNumber: 2, uValue: 2 }, { pageNumber: 3, uValue: 3 }, { pageNumber: 4, uValue: 4 }]);

  useEffect(() => { console.log("-dlide updated") }, [slide])

  const headerProps = { setSRC, setTextArea, setImages, slide, setNewSlide };
  const sideBarProps = { slide, setNewSlide };
  const editorProps = { src, textArea, images, slide };
  return (
    <div className="App">
      <Header {...headerProps} />
      <main>
        <SideBar {...sideBarProps} />
        <Editor {...editorProps} />
      </main>
    </div>
  );
}

export default App;
