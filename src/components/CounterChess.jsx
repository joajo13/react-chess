import React, { useState } from "react";
import { Counter } from "./Counter";
import "./CounterChess.css";
import { TbPlayerPlay, TbReload, TbPlayerPause } from "react-icons/tb";

export const CounterChess = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [counterInitialState, setCounterInitialState] = useState(0);
  const [extraSecs, setExtraSecs] = useState(0);
  const [isSetted, setisSetted] = useState(false);

  const onTimeChange = (e) => {
    setCounterInitialState(e.target.value);
  };

  const onExtraSecondsChange = (e) => {
    setExtraSecs(e.target.value);
  };

  const onPlayClick = () => {
    setIsPaused(!isPaused);
  };

  return (
    <div>
      <h1>Counter Chess</h1>
      <div className="menu-grid">
        <div className="form-container">
          <form action="submit">
            <label htmlFor="1">Time</label>
            <input
              type="number"
              placeholder="0s..."
              id="1"
              value={counterInitialState}
              onChange={onTimeChange}
            />
            <label htmlFor="2">Extra seconds</label>
            <input
              type="number"
              placeholder="0s..."
              id="2"
              value={extraSecs}
              onChange={onExtraSecondsChange}
            />
          </form>
        </div>
        <div className="handle-container">
          {isPaused ? (
            <TbPlayerPause className="icon" onClick={onPlayClick} />
          ) : (
            <TbPlayerPlay className="icon" onClick={onPlayClick} />
          )}

          <TbReload className="icon" />
        </div>
      </div>
      <button onClick={() => setisSetted(true)}>Set</button>

      {isSetted ? (
        <Counter initialState={counterInitialState} extraSecs={extraSecs} />
      ) : null}
    </div>
  );
};
