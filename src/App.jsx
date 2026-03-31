import "./styles/App.css";

import { Board } from "./components/board";
import { Result } from "./components/result";
import { Dialog } from "./components/dialog";
import { useEffect, useRef, useState } from "react";
import { assignNewId, closest, shuffleList } from "./utils";

class Card {
  constructor(cardName, isSelect = false) {
    this.id = crypto.randomUUID();
    this.cardName = cardName;
    this.isSelect = isSelect;
  }
}

const cardNames = [
  "Pick",
  "wandering",
  "grace",
  "honor",
  "oghene",
  "hope",
  "sandra",
  "honest",
  "peace"
];

const cardList = [];

for (const cardName of cardNames) {
  cardList.push(new Card(cardName));
}

function App() {
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [lists, setList] = useState(cardList);
  const [score, setScore] = useState(0);
  const bestScoreRef = useRef(score);
  const floatingScoreRef = useRef(null);

  const cardLen = lists.length

  useEffect(() => {
    setTimeout(() => {
      floatingScoreRef.current.classList.remove("active");
    }, 1000);
  }, [score]);

  const isSelect = (id) => {
    const index = lists.findIndex((list) => list.id === id);

    if (lists[index].isSelect) {
      setIsGameOver(true);
      setIsWinner(false);
    } else {
      const newList = [...lists];
      newList[index].isSelect = true;
      setList(shuffleList(assignNewId(newList)));

      const newScore = score + 1;
      floatingScoreRef.current.classList.add("active");
      setScore(newScore);

      if (newScore > bestScoreRef.current) {
        bestScoreRef.current = newScore;
      }

      if (newScore === cardLen) {
        setIsWinner(true);
        setIsGameOver(true);
      }
    }
  };

  function handleIsSelect(e) {
    const target = e.target;
    const cardItem = closest(target);

    if (!cardItem) return;

    const cardId = cardItem.dataset.cardId;
    isSelect(cardId);
  }

  function reset() {
    setList(
      shuffleList(
        lists.map((list) => {
          list.id = crypto.randomUUID();
          list.isSelect = false;
          return list;
        })
      )
    );
    setIsGameOver(false);
    setScore(0);
  }

  return (
    <>
      <header>
        <div className="logo">Memory Game🤔</div>
        <div ref={floatingScoreRef} className="floating_score">
          +1🎖️
        </div>
        <Result
          score={score}
          cardLen={cardLen}
          bestScore={bestScoreRef.current}
        />
      </header>
      <main>
        <Board handleIsSelect={handleIsSelect} lists={lists} />
        <Dialog
          isWinner={isWinner}
          isGameOver={isGameOver}
          score={score}
          cardLen={cardLen}
          reset={reset}
        />
      </main>
    </>
  );
}

export default App;
