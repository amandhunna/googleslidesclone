import React, { useEffect } from "react";

export default function Editor(props) {
  const { activeSlide, handleTemplateClick, slide } = props;
  const getSlides = () => {
    console.log("----editor", slide, activeSlide);
    return slide.map((data) => (
      <div
        id={activeSlide[data.uValue]}
        className="slideSnap"
        onClick={() => handleTemplateClick(data.uValue)}
      >
        {data.images.map((image) => (
          <img
            className="slideImage"
            alt="not found"
            src={image.src}
            style={{ top: `${image.top}px`, left: `${image.left}px` }}
          />
        ))}
      </div>
    ));
  };

  useEffect(() => {}, [props]);

  return <section>{getSlides()}</section>;
}
