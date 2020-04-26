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
        {data.textFields.map((textField) => {
          const top = textField.top >= 30 ? textField.top : 30;
          const left = textField.left >= 30 ? textField.left : 30;
          const rows = textField.row || "4";
          const cols = textField.cols || "50";
          return (
            <textarea
              id={textField.id}
              rows={rows}
              cols={cols}
              className="slideTextArea"
              alt="not found"
              style={{ top: `${top}px`, left: `${left}px` }}
            />
          );
        })}
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

  useEffect(() => {
    console.log("-----------slide", slide);
  }, [props]);

  return <section>{getSlides()}</section>;
}
