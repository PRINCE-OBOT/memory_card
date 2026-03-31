import { useRef } from "react";

export function Dialog({ isWinner, isGameOver, reset }) {
  const dialogRef = useRef(null);

  let status;

  const isLoser = isGameOver && !isWinner;
  if (isLoser) {
    status = (
      <div>
        <p>You Lose</p>
        <button>Try again</button>
      </div>
    );
  }

  if (isWinner) {
    status = (
      <div>
        <p>You Won</p>
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
    <dialog ref={dialogRef}>
      <form action="" onSubmit={handleCloseDialog}>
        <p>Game Over</p>
        {status}
      </form>
    </dialog>
  );
}
