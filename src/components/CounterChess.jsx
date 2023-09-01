import React from "react";
import { Counter } from "./Counter";

export const CounterChess = () => {
  return (
    <div>
      <h1>Counter Chess</h1>
      <div>
        <button>Start/Stop</button>
      </div>
      <Counter />
      <Counter />
    </div>
  );
};
