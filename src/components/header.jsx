import React, { useEffect } from "react";

export default function Header(props) {
  const { setSRC, setTextArea, setImages, setNewSlide } = props;
  function updateValue(e) {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (readerEvent) => {
      const value = readerEvent.target.result;
      console.log(value);
      setSRC(value);
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
          setImages((prev) => prev.push({ ...image, id: prev.id + 1 }))
        }
      >
        Add new Image
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
