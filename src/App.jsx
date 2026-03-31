import "./styles/App.css";

import { Board } from "./components/board";
import { Result } from "./components/result";
import { Dialog } from "./components/dialog";
import { useState } from "react";

function App() {
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWinner, setIsWinner] = useState(false);

  return (
    <>
      <header>
        <Result onWinner={setIsWinner} />
      </header>
      <main>
        <Board onGameOver={setIsGameOver} isGameOver={isGameOver} />
        <Dialog isWinner={isWinner} isGameOver={isGameOver} />
      </main>
    </>
  );
}

export default App;
