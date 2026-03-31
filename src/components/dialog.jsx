import { useRef } from "react";

export function Dialog({ isWinner, isGameOver, score, cardLen, reset }) {
  const dialogRef = useRef(null);

  let status;

  const isLoser = isGameOver && !isWinner;
  if (isLoser) {
    status = (
      <div>
        <p>You Lose 🙆</p>
        <button>Try again</button>
      </div>
    );
  }

  if (isWinner) {
    status = (
      <div>
        <p>You Won 🎉</p>
        <button>Play again</button>
      </div>
    );
  }

  if (isGameOver && (isWinner || isLoser)) {
    dialogRef.current.showModal();
  }

  function handleCloseDialog(e) {
    e.preventDefault();
    dialogRef.current.close();
    reset();
  }

  return (
    <dialog ref={dialogRef} className="display_final_result">
      <form action="" onSubmit={handleCloseDialog}>
        <p>Game Over</p>
        <p>Score: {score} / {cardLen}</p>
        {status}
      </form>
    </dialog>
  );
}
