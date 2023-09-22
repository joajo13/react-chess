import "./Counter.css";
import { Settings } from "./Settings";
import { ConfigPanel } from "./ConfigPanel";
import { useCounter } from "../hooks/useCounter";
import { useMemo } from "react";

export const Counter = () => {
  const {
    counters,
    countRender,
    handleClick,
    handlePlayClick,
    handleResetClick,
    handleSettingsClick,
    handleCloseSettings,
    handleNewValues,
  } = useCounter();

  const convertToTime = useMemo(() => {
    return (value) => {
      const minutes = Math.floor(value / 60);
      const seconds = value % 60;
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };
  }, []);

  const buttonClass = {
    counter1:
      `button ${
        counters.counter2.isCounting && !counters.finish ? "is-counting" : ""
      } ${counters.finish && counters.counter1.isCounting ? "finish" : ""}` ||
      "button is-counting",
    counter2:
      `button ${
        counters.counter1.isCounting && !counters.finish ? "is-counting" : ""
      } ${counters.finish && counters.counter2.isCounting ? "finish" : ""}` ||
      "button is-counting",
  };

  return (
    <div className="container">
      <button
        name="counter1"
        onClick={(e) => handleClick(e.target)}
        className={buttonClass.counter1}
        disabled={counters.onSettings}
        style={counters.onSettings ? { pointerEvents: "none" } : {}}
      >
        <span className="text r">{convertToTime(countRender.counter1)}</span>
      </button>

      <Settings
        handlePlayClick={handlePlayClick}
        handleResetClick={handleResetClick}
        handleSettingsClick={handleSettingsClick}
        counters={counters}
      />

      {counters.onSettings ? (
        <ConfigPanel onClose={handleCloseSettings} onSet={handleNewValues} />
      ) : null}

      <button
        onClick={(e) => handleClick(e.target)}
        name="counter2"
        className={buttonClass.counter2}
        disabled={counters.onSettings}
        style={counters.onSettings ? { cursor: "default" } : {}}
      >
        <span className="text">{convertToTime(countRender.counter2)}</span>
      </button>
    </div>
  );
};
