import { useState } from "react";
import "../styles/board.css";
import { eventBus } from "../utils";

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
  "joking",
  "grace",
  "peace",
  "grey",
  "ok",
  "wonderful",
  "honor"
];

const cardList = [];

for (const cardName of cardNames) {
  cardList.push(new Card(cardName));
}

const assignNewId = (lists) => {
  return lists.map((list) => {
    list.id = crypto.randomUUID();
    return list;
  });
};

const closest = (elem, attr = "[data-card-id]") => elem.closest(attr);

const shuffleList = (lists) => {
  const newList = [...lists];
  const newListLen = newList.length;
  for (let i = 0; i < newListLen; i++) {
    const randomIndex = Math.floor(Math.random() * newListLen);

    [newList[i], newList[randomIndex]] = [newList[randomIndex], newList[i]];
  }
  return newList;
};

export function Board({ onGameOver }) {
  const [lists, setList] = useState(cardList);

  const isSelect = (id) => {
    const index = lists.findIndex((list) => list.id === id);

    if (lists[index].isSelect) {
      onGameOver(true);
    } else {
      const newList = [...lists];
      newList[index].isSelect = true;
      setList(shuffleList(assignNewId(newList)));

      eventBus.dispatchEvent(
        new CustomEvent("card-select", {
          detail: {
            scoreCount: 1,
            cardLen: cardNames.length
          }
        })
      );
    }
  };

  function handleIsSelect(e) {
    const target = e.target;
    const cardItem = closest(target);

    if (!cardItem) return;

    const cardId = cardItem.dataset.cardId;
    isSelect(cardId);
  }

  return (
    <section id="board" onClick={handleIsSelect}>
      {lists.map(({ id, cardName }) => {
        return (
          <div key={id} className="card_item" data-card-id={id}>
            {cardName}
          </div>
        );
      })}
    </section>
  );
}
