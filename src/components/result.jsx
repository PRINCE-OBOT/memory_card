import { useState } from "react";
import { eventBus } from "../utils";

export function Result({ onWinner }) {
  const [score, setScore] = useState(0);

  eventBus.addEventListener("card-select", (e) => {
    const detail = e.detail;
    const scoreCount = detail.scoreCount;
    const cardLen = detail.cardLen;

    if (scoreCount < 0) return;

    setScore(score + scoreCount);

    if (score === cardLen) {
      onWinner(true);
    }
  });

  return (
    <section>
      <p>{score}</p>
    </section>
  );
}
