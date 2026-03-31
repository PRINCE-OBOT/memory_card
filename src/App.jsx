import "./App.css";

import { useState } from "react";
import { Board } from "./components/board";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Board />
    </>
  );
}

export default App;
