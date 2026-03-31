import { useRef } from "react";

export function Dialog({ isWinner, isGameOver }) {
  const dialogRef = useRef(null);

  let status;
  if (isWinner) {
    status = (
      <div>
        <p>You Won</p>
        <button>Play again</button>
      </div>
    );
  }

  if (isGameOver) {
    status = (
      <div>
        <p>You Lose</p>
        <button>Try again</button>
      </div>
    );
  }

  if (isGameOver || isWinner) {
    dialogRef.current.showModal();
  }

  function handleCloseDialog(e) {
    e.preventDefault();
    dialogRef.current.close();
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
