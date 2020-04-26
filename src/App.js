import React, { useState } from 'react';
import './App.css';
import "./css"
import { Header, SideBar, Editor } from "./components";

function App() {
  const [src, setSRC] = useState();
  const [textArea, setTextArea] = useState([]);
  const [images, setImages] = useState([]);
  const [activeSlide, setActiveSlide] = useState({ "1s": "activeSlide" })
  const [slide, setNewSlide] = useState([
    { pageNumber: "one", uValue: "1s", images: [{ id: "something", src: "", top: 0, left: 0 }], textFields: [{}] },
    /* { pageNumber: "two", uValue: "2s" },
    { pageNumber: "three", uValue: "3s" },
    { pageNumber: "four", uValue: "4s" },
    { pageNumber: "five", uValue: "5s" } */]);

  const handleTemplateClick = slideNumber => {
    setActiveSlide({ [slideNumber]: "activeSlide" });
  };

  const headerProps = {
    activeSlide,
    setImages,
    setNewSlide,
    setSRC,
    setTextArea,
    slide,
  };
  const sideBarProps = {
    setNewSlide,
    slide,
  };
  const editorProps = {
    activeSlide,
    images,
    setActiveSlide,
    slide,
    src,
    textArea,
    handleTemplateClick,
  };
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
