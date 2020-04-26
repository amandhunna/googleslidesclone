import React, { useEffect } from "react";

export default function Header(props) {
  const { setSRC, setTextArea, setImages, setNewSlide, activeSlide } = props;
  function updateValue(e) {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (readerEvent) => {
      const value = readerEvent.target.result;
      setNewSlide((prev) => {
        const newState = [...prev];
        for (let index = 0; index < newState.length; index++) {
          console.log(
            "----",
            newState[index].uValue === Object.keys(activeSlide)[0],
            newState[index].uValue,
            activeSlide
          );
          if (newState[index].uValue === Object.keys(activeSlide)[0]) {
            newState[index].images.push({ src: value, top: 0, left: 0 });
          }
        }
        console.log("newState:", newState);
        return newState;
      });
    };
  }
  const textField = {};
  const image = {};
  const slide = {};
  useEffect(() => {
    const input = document.querySelector("input");
    input.addEventListener("change", updateValue);
  }, []);

  return (
    <header>
      <button
        onClick={() =>
          setTextArea((prev) => prev.push({ ...textField, id: prev.id + 1 }))
        }
      >
        Add new Text
      </button>
      <button
        onClick={() =>
          setNewSlide((prev) => {
            const newState = [...prev];
            newState.push({ pageNumber: 10 });
            console.log("----", prev);
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
