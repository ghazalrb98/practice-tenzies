import React from "react";

export default function Die(props) {
  const styles = {
    backgroundImage: `url("images/die${props.value}.svg")`,
  };

  return <div className="die-container" style={styles}></div>;
}
