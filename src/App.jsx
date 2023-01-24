import React from "react";
import Die from "../components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = React.useState(() => allNewDice());
  const [isgameFinished, setIsGameFinished] = React.useState(false);
  const [rollCnt, setRollCnt] = React.useState(0);

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
      setRollCnt(0);
    } else {
      setDice(dice.map((die) => (die.isHeld ? die : generateDie())));
      setRollCnt((prevRollCnt) => prevRollCnt + 1);
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
      {isgameFinished && <Confetti />}
      <h1 className="heading">Tenzies</h1>
      <h4 className="sub-heading">
        <span className="bold underline-1">Roll</span>,{" "}
        <span className="bold underline-2">Freeze</span> until all dice are the{" "}
        <span className="bold circle">same</span>.
      </h4>
      <div className="dice-container">{diceElement}</div>
      <button className="game-btn" onClick={handleBtnClick}>
        {!isgameFinished ? "Roll" : "New game"}
        {!isgameFinished && <img src="images/roll-icon.svg"></img>}
      </button>
      <h5 className="roll-cnt">Roll count: {rollCnt}</h5>
      <img className="tip-img" src="/images/tip.svg" />
    </div>
  );
}
