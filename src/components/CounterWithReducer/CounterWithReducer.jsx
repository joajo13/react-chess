import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import "../Counter.css";
import { TbSettings, TbReload, TbPlayerStop, TbX } from "react-icons/tb";
import { counterReducer } from "./counterReducer";
import { ACTIONS } from "./ACTIONS";
import { ConfigPanel } from "./ConfigPanel";

const initialCounters = {
  counter1: {
    id: "1",
    value: 240,
    isCounting: false,
    extraSecs: 0,
  },
  counter2: {
    id: "2",
    value: 240,
    isCounting: false,
    extraSecs: 0,
  },
};

export const CounterWithReducer = ({ initialState = 120 }) => {
  const [counters, dispatch] = useReducer(counterReducer, initialCounters);
  const [isOnConfig, setIsOnConfig] = useState(false);
  const intervalRef = useRef(null);

  const convertToTime = useMemo(() => {
    return (value) => {
      const minutes = Math.floor(value / 60);
      const seconds = value % 60;
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };
  }, []);

  const handleCounterClickCounter1 = () => {
    handleStart(counters.counter1);
    handleStop(counters.counter2);
  };

  const handleCounterClickCounter2 = () => {
    handleStart(counters.counter2);
    handleStop(counters.counter1);
  };

  const handleStart = (counter) => {
    const type =
      counter.id === "1" ? ACTIONS.START_COUNTER1 : ACTIONS.START_COUNTER2;
    const action = {
      type: type,
      payload: counter.value + 1,
    };
    dispatch(action);
  };

  const handleStopAll = (counters) => {
    const action = {
      type: ACTIONS.STOP,
      payload: counters,
    };

    dispatch(action);
  };

  const handleStop = (counter) => {
    const action = {
      type: counter.id === "1" ? ACTIONS.STOP_COUNTER1 : ACTIONS.STOP_COUNTER2,
      payload: counter,
    };
  };

  const handleReset = () => {
    const action = {
      type: ACTIONS.RESET,
      payload: initialState,
    };
  };

  return (
    <div className="container">
      <button
        className={`button ${
          counters.counter1.isCounting ? "is-counting" : ""
        }`}
        onClick={handleCounterClickCounter1}
        disabled={isOnConfig}
        style={isOnConfig ? { cursor: "default" } : {}}
      >
        {convertToTime(counters.counter1.value)}
      </button>
      <div className="options-container">
        <button onClick={() => handleStopAll(counters)}>
          <TbPlayerStop size="30px" />
        </button>
        <button>
          <TbSettings size="30px" />
        </button>
        <button>
          <TbReload size="30px" />
        </button>
      </div>
      {isOnConfig ? (
        <ConfigPanel onExit={onExitConfig} onSet={onSetConfig} />
      ) : null}
      <button
        className={`button ${
          counters.counter2.isCounting ? "is-counting" : ""
        }`}
        onClick={handleCounterClickCounter2}
        disabled={isOnConfig}
        style={isOnConfig ? { cursor: "default" } : {}}
      >
        {convertToTime(counters.counter2.value)}
      </button>
    </div>
  );
};
