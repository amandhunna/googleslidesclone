import React, { useEffect } from "react";

export default function Editor(props) {
  const { slide } = props;
  const getSlides = () => {
    console.log("----editor", slide);
    return slide.map((data, index) => (
      <div
        id={props.activeSlide[data.uValue]}
        className="slideSnap"
        onClick={() => props.handleTemplateClick(data.uValue)}
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

  useEffect(() => {
    console.log("---props", props);
  }, [props]);

  return <section>{getSlides()}</section>;
}
