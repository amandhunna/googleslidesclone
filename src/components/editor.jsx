import React, { useEffect } from "react";

export default function Editor(props) {
  const { activeSlide, handleTemplateClick, slide } = props;
  const getSlides = () => {
    return slide.map((data) => (
      <div
        id={activeSlide[data.uValue]}
        className="slide"
        onClick={() => handleTemplateClick(data.uValue)}
      >
        {data.images.map((image) => {
          const top = image.top >= 30 ? image.top : 30;
          const left = image.left >= 30 ? image.left : 30;
          return (
            <img
              className="slideImage"
              alt="not found"
              src={image.src}
              style={{ top: `${top}px`, left: `${left}px` }}
            />
          );
        })}
      </div>
    ));
  };

  useEffect(() => {}, [props]);

  return <section>{getSlides()}</section>;
}
