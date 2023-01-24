import React from "react";

export default function Die(props) {
  const imgSrc = `images/die${props.value}${
    props.isHeld ? "-colored" : ""
  }.svg`;

  return (
    <div className="die-container">
      <img className="die-img" onClick={props.toggleHold} src={imgSrc}></img>
    </div>
  );
}
