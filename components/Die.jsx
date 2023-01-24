import React from "react";

export default function Die(props) {
  const [isTempColored, setIsTempColored] = React.useState(false);
  const imgSrc = `images/die${props.value}${
    isTempColored ? "-colored" : ""
  }.svg`;

  return (
    <div className="die-container">
      <img
        className="die-img"
        onMouseEnter={() => setIsTempColored(true)}
        onMouseLeave={() => setIsTempColored(false)}
        src={imgSrc}
      ></img>
    </div>
  );
}
