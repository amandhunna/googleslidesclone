import React, { useEffect } from "react";

export default function Header(props) {
  const { setNewSlide, activeSlide, slide, properties, setProperties } = props;

  // not used, will use to limit value of the images and text box
  const limiter = (obj, key) => {
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

  const onPropertyValueChange = (key, value) => {
    const newState = [...slide];

    for (let index = 0; index < newState.length; index++) {
      if (newState[index].uValue === Object.keys({ ...activeSlide })[0]) {
        for (let k = 0; k < newState[index].images.length; k++) {
          console.log(newState[index].images[k]);
          if (properties.id === newState[index].images[k].id) {
            newState[index].images[k][key] = parseInt(value, 10);
            break;
          }
        }
        break;
      }
    }
    setNewSlide(newState);
    setProperties((prev) => ({
      ...prev,
      [key]: value,
    }));
    console.log("newState:", newState);
  };

  const getProperties = () => {
    const propertiesDOM = [];
    const itProperties = { ...properties };
    for (const property in itProperties) {
      if (property !== "id" && property !== "src") {
        const item = (
          <div className="properties" key={"property".concat(Math.random())}>
            <p>{property}</p>
            <input
              value={properties[property]}
              onChange={(e) => {
                const value = e.target.value;
                onPropertyValueChange(property, value);
              }}
            />
          </div>
        );
        propertiesDOM.push(item);
      }
    }
    return propertiesDOM;
  };
  const addImage = (value) => {
    const newState = [...slide];

    for (let index = 0; index < newState.length; index++) {
      if (newState[index].uValue === Object.keys({ ...activeSlide })[0]) {
        newState[index].images.push({
          id: (100000 * Math.random()).toString(),
          src: value,
          top: 0,
          left: 0,
          height: 300,
          width: 300,
        });
        break;
      }
    }
    setNewSlide(newState);
    console.log("newState:", newState);
  };

  const uploadImage = (e) => {
    //  if (!e.target.files) return
    const files = e.target.files;
    const file = files[files.length - 1];
    console.log("file", file);
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
          id: "textArea" + (100000 * Math.random()).toString(),
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
    const input = document.querySelector("#avatar");
    input.addEventListener("change", uploadImage);
    return () => input.removeEventListener("change", uploadImage);
  }, [activeSlide]);

  return (
    <header>
      {getProperties()}
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
        multiple
      />
      <button disabled>Present</button>
      <button onClick={() => window.print()}>Print</button>
    </header>
  );
}
