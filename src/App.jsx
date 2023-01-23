import React from "react";
import Die from "../components/Die";
import { nanoid } from "nanoid";

export default function App() {
  const [dice, setDice] = React.useState(() => allNewDice());

  function getRandomNumber() {
    return Math.ceil(Math.random() * 6);
  }

  function generateDie() {
    return {
      id: nanoid(),
      isHeld: false,
      value: getRandomNumber(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 9; i++) {
      newDice.push(generateDie());
    }

    return newDice;
  }

  const diceElement = dice.map((die) => <Die key={die.id} value={die.value} />);
  return (
    <div>
      <h1 className="heading">Tenzies</h1>
      <h4 className="sub-heading">
        <span className="bold underline-1">Roll</span>,{" "}
        <span className="bold underline-2">Freeze</span> until all dice are the{" "}
        <span className="bold circle">same</span>.
      </h4>
      <div className="dice-container">{diceElement}</div>
    </div>
  );
}
