import React from "react";
import Die from "../components/Die";
import { nanoid } from "nanoid";

export default function App() {
  const [dice, setDice] = React.useState(() => allNewDice());
  const [isgameFinished, setIsGameFinished] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const allSame = dice.every((die) => die.value === dice[0].value);

    if (allHeld && allSame) {
      setIsGameFinished(true);
    }
  }, [dice]);

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

  function toggleHold(dieId) {
    setDice(
      dice.map((die) =>
        die.id === dieId ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  function handleBtnClick() {
    if (isgameFinished) {
      setDice(allNewDice());
      setIsGameFinished(false);
    } else {
      setDice(dice.map((die) => (die.isHeld ? die : generateDie())));
    }
  }

  const diceElement = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      toggleHold={() => toggleHold(die.id)}
    />
  ));

  return (
    <div>
      <h1 className="heading">Tenzies</h1>
      <h4 className="sub-heading">
        <span className="bold underline-1">Roll</span>,{" "}
        <span className="bold underline-2">Freeze</span> until all dice are the{" "}
        <span className="bold circle">same</span>.
      </h4>
      <div className="dice-container">{diceElement}</div>
      <button className="game-btn" onClick={handleBtnClick}>
        {!isgameFinished ? "Roll" : "Start a new game"}
        {!isgameFinished && <img src="images/roll-icon.svg"></img>}
      </button>
      <img className="tip-img" src="/images/tip.svg" />
    </div>
  );
}
