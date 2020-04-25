import React, { useEffect } from "react";


export default function Editor(props) {
  const { slide } = props;
  const getSlides = () => {
    console.log("----editor", slide);
    return slide.map((data) => (
      <div className="slideSnap">{data.pageNumber}</div>
    ));
  };

  useEffect(() => {
    console.log("---props", props);
  }, [props]);

  return (
    <section>
      {getSlides()}
      <img id="values" alt="m" src={props.src} />
    </section>
  );
}
