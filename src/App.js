import React, { useState } from 'react';
import './App.css';
import "./css"
import { Header, SideBar, Editor } from "./components";

function App() {
  const [activeSlide, setActiveSlide] = useState({ "1s": "activeSlide" })
  const [properties, setProperties] = useState(/* {
    src: "value",
    top: 0,
    left: 0,
    height: 300,
    width: 300,
    id: (100000 * Math.random()).toString(),
  } */)
  const [slide, setNewSlide] = useState([
    { uValue: "1s", images: [], textFields: [] },
    /* { pageNumber: "two", uValue: "2s" },
    { pageNumber: "three", uValue: "3s" },
    { pageNumber: "four", uValue: "4s" },
    { pageNumber: "five", uValue: "5s" } */]);

  const handleTemplateClick = slideNumber => {
    setActiveSlide({ [slideNumber]: "activeSlide" });
  };

  const headerProps = {
    activeSlide,
    setNewSlide,
    slide,
    properties, setProperties
  };
  const sideBarProps = {
    setNewSlide,
    slide,
  };
  const editorProps = {
    activeSlide,
    setActiveSlide,
    slide,
    handleTemplateClick,
    setProperties
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
