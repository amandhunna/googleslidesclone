import React, { useState } from "react";
import DragAndDrop from "./vanillaDragDrop";

export default function SideBar(props) {
  const { slide, setNewSlide } = props;
  const getSlides = () => {
    return slide.map((data) => (
      <div id={data.uValue} className="slideSnap">
        {data.pageNumber}
      </div>
    ));
  };
  return (
    <aside>
      <DragAndDrop>{getSlides()}</DragAndDrop>
    </aside>
  );
}
