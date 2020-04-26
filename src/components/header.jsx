import React, { useEffect } from "react";

export default function Header(props) {
  const { setNewSlide, activeSlide, slide } = props;

  const addImage = (value) => {
    const newState = [...slide];

    for (let index = 0; index < newState.length; index++) {
      if (newState[index].uValue === Object.keys({ ...activeSlide })[0]) {
        newState[index].images.push({
          id: (100000 * Math.random()).toString(),
          src: value,
          top: 0,
          left: 0,
        });
        break;
      }
    }
    setNewSlide(newState);
    console.log("newState:", newState);
  };

  const uploadImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (readerEvent) => {
      const value = readerEvent.target.result;
      addImage(value);
    };
  };

  const addTextField = () => {
    const newState = [...slide];

    for (let index = 0; index < newState.length; index++) {
      console.log(index);
      if (newState[index].uValue === Object.keys({ ...activeSlide })[0]) {
        newState[index].textFields.push({
          id: (100000 * Math.random()).toString(),
          top: 30,
          left: 30,
        });
        break;
      }
    }
    setNewSlide(newState);
    console.log("newState:", newState);
  };

  useEffect(() => {
    const input = document.querySelector("input");
    input.addEventListener("change", uploadImage);
    return () => input.removeEventListener("change", uploadImage);
  }, [activeSlide]);

  return (
    <header>
      <button onClick={() => addTextField()}>Add new Text</button>
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
      <button onClick={() => document.getElementById("avatar").click()}>
        Add image
      </button>
      <input
        type="file"
        id="avatar"
        name="avatar"
        style={{ display: "none" }}
      />
      {/* <button disabled>Present</button> */}
    </header>
  );
}
