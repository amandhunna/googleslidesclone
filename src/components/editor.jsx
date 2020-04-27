import React, { useEffect } from "react";

export default function Editor(props) {
  const { activeSlide, handleTemplateClick, slide, setProperties } = props;

  const getValue = (obj, key) => {
    const initialValue = obj[key];
    const parseInt = parseInt(initialValue, 10);
    let finalValue = initialValue;
    if (initialValue <= 30) {
      finalValue = 30;
    }
    const element = document.querySelector(".slide");
    const breakPoint =
      key === "height" ? element.offsetHeight : element.offsetWidth;
    if (initialValue > breakPoint) finalValue = breakPoint;
    return finalValue;
  };
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
          console.log(image);
          const top = parseInt(image.top, 10) >= 30 ? image.top : 30;
          const left = parseInt(image.left, 10) >= 30 ? image.left : 30;
          const height = image.height;
          const width = image.width;
          console.log("-0-----------", typeof top, top, image.top);
          return (
            <img
              id={image.id}
              className="slideImage"
              alt="not found"
              src={image.src}
              style={{
                top: `${top}px`,
                left: `${left}px`,
                height: "50%",
                width: "50%",
              }}
              onClick={() => setProperties(image)}
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
