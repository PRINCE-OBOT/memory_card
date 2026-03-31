export function Result({ score, bestScore, cardLen }) {
  return (
    <section id="result">
      <p>
        Score ⌛: {score} / {cardLen}
      </p>
      <p>Best Score🏆: {bestScore}</p>
    </section>
  );
}
