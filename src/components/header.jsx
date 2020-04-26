import React, { useEffect } from "react";

export default function Header(props) {
  const { setTextArea, setNewSlide, activeSlide } = props;

  const updateSlide = (value) => {
    setNewSlide((prev) => {
      const newState = [...prev];

      for (let index = 0; index < newState.length; index++) {
        if (newState[index].uValue === Object.keys({ ...activeSlide })[0]) {
          newState[index].images.push({
            id: (100000 * Math.random()).toString(),
            src: value,
            top: 0,
            left: 0,
          });
        }
      }
      console.log("newState:", newState);
      return newState;
    });
  };

  const updateValue = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (readerEvent) => {
      const value = readerEvent.target.result;
      updateSlide(value);
    };
  };

  useEffect(() => {
    const input = document.querySelector("input");
    input.addEventListener("change", updateValue);
    return () => input.removeEventListener("change", updateValue);
  }, [activeSlide]);

  useEffect(() => {}, [activeSlide]);
  return (
    <header>
      <button
        onClick={() => setTextArea((prev) => prev.push({ id: prev.id + 1 }))}
      >
        Add new Text
      </button>
      <button
        onClick={() =>
          setNewSlide((prev) => {
            const newState = [...prev];
            newState.push({
              uValue: (100000 * Math.random()).toString(),
              images: [],
              textFields: [],
            });
            return newState;
          })
        }
      >
        Add new Slide
      </button>
      <label for="avatar">Choose a profile picture:</label>
      <input type="file" id="avatar" name="avatar" />
      <br />
    </header>
  );
}
