import React, { useState } from "react";
import DragAndDrop from "./vanillaDragDrop";

export default function SideBar(props) {
  const { slide, setNewSlide } = props;
  const getSlides = () => {
    return slide.map((data, index) => (
      <DragAndDrop id={index} setNewSlide={setNewSlide}>
        <div id={data.uValue} className="slideSnap">
          <button
            onClick={() => {
              const newSlide = [...slide];
              newSlide.splice(index, 1);
              setNewSlide(newSlide);
            }}
          >
            x
          </button>
          {data.pageNumber}=={index + 1}
        </div>
      </DragAndDrop>
    ));
  };
  return <aside>{getSlides()}</aside>;
}
