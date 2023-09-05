import { useMemo, useRef, useState } from "react";
import "./Counter.css";
import { TbSettings, TbReload, TbPlayerStop, TbX } from "react-icons/tb";

const ConfigPanel = ({ onExit, onSet }) => {
  const timeRef = useRef();
  const extraTimeRef = useRef();
  return (
    <div className="config-card">
      <button className="button-x" onClick={onExit}>
        <TbX size="25px" />
      </button>
      <label htmlFor="1">Set time</label>
      <input ref={timeRef} type="text" id="1" placeholder="seconds..." />
      <label htmlFor="2">Set extra time</label>
      <input ref={extraTimeRef} type="text" id="2" placeholder="seconds..." />
      <button
        className="button-set"
        onClick={() => onSet(extraTimeRef.current.value, timeRef.current.value)}
      >
        Set
      </button>
    </div>
  );
};

export const Counter = ({ initialState = 120 }) => {
  const [counter1, setCounter1] = useState({
    value: initialState,
    isCounting: false,
    extraSecs: 0,
  });
  const [counter2, setCounter2] = useState({
    value: initialState,
    isCounting: false,
    extraSecs: 0,
  });
  const [isStarted, setIsStarted] = useState(false);
  const [isOnConfig, setIsOnConfig] = useState(false);
  const intervalRef = useRef(null);

  const onStart = (counter) => {
    if (counter === "counter1") {
      setCounter1((c) => ({ ...c, isCounting: true }));
      intervalRef.current = setInterval(() => {
        setCounter1((c) => ({ ...c, value: c.value - 1 }));
      }, 1000);
      setIsStarted(true);
    }

    if (counter === "counter2") {
      setCounter2((c) => ({ ...c, isCounting: true }));
      intervalRef.current = setInterval(() => {
        setCounter2((c) => ({ ...c, value: c.value - 1 }));
      }, 1000);
      setIsStarted(true);
    }
  };

  const onStop = (type) => {
    clearInterval(intervalRef.current);
    if (type === "counter1") {
      setCounter1((c) => ({
        ...c,
        isCounting: false,
        value: c.value + parseInt(c.extraSecs),
      }));
    }
    if (type === "counter2") {
      setCounter2((c) => ({
        ...c,
        isCounting: false,
        value: c.value + parseInt(c.extraSecs),
      }));
    }
    if (type === "all") {
      setCounter1((c) => ({ ...c, isCounting: false }));
      setCounter2((c) => ({ ...c, isCounting: false }));
      setIsStarted(false);
    }
  };

  const handleCounterClickCounter1 = () => {
    if (isStarted) {
      if (counter2.isCounting) {
        onStop("counter2");
        onStart("counter1");
      } else {
        return;
      }
    } else {
      onStart("counter1");
    }
  };

  const handleCounterClickCounter2 = () => {
    if (isStarted) {
      if (counter1.isCounting) {
        onStop("counter1");
        onStart("counter2");
      } else {
        return;
      }
    } else {
      onStart("counter2");
    }
  };

  const onReset = () => {
    onStop("all");
    setCounter1((c) => ({ ...c, value: initialState }));
    setCounter2((c) => ({ ...c, value: initialState }));
    setIsStarted(false);
  };

  const onSetting = () => {
    setIsOnConfig(!isOnConfig);
    onStop("all");
  };

  const onSetConfig = (extraTime, time) => {
    setIsOnConfig(false);
    setCounter1({
      value: time,
      isCounting: false,
      extraSecs: extraTime,
    });
    setCounter2({
      value: time,
      isCounting: false,
      extraSecs: extraTime,
    });
  };

  const onExitConfig = () => {
    setIsOnConfig(false);
  };

  const convertToTime = useMemo(() => {
    return (value) => {
      const minutes = Math.floor(value / 60);
      const seconds = value % 60;
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };
  }, []);

  return (
    <div className="container">
      <button
        className={`button ${counter1.isCounting ? "is-counting" : ""}`}
        onClick={handleCounterClickCounter1}
        disabled={isOnConfig}
        style={isOnConfig ? { cursor: "default" } : {}}
      >
        {convertToTime(counter1.value)}
      </button>
      <div className="options-container">
        <button onClick={() => onStop("all")}>
          <TbPlayerStop size="30px" />
        </button>
        <button>
          <TbSettings size="30px" onClick={onSetting} />
        </button>
        <button>
          <TbReload size="30px" onClick={onReset} />
        </button>
      </div>
      {isOnConfig ? (
        <ConfigPanel onExit={onExitConfig} onSet={onSetConfig} />
      ) : null}
      <button
        className={`button ${counter2.isCounting ? "is-counting" : ""}`}
        onClick={handleCounterClickCounter2}
        disabled={isOnConfig}
        style={isOnConfig ? { cursor: "default" } : {}}
      >
        {convertToTime(counter2.value)}
      </button>
    </div>
  );
};
