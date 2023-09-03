import { useMemo, useRef, useState } from "react";
import "./Counter.css";

export const Counter = ({ initialState = 0, extraSecs }) => {
  const [counter1, setCounter1] = useState({
    value: initialState,
    isCounting: false,
  });
  const [counter2, setCounter2] = useState({
    value: initialState,
    isCounting: false,
  });
  const [isStarted, setIsStarted] = useState(false);
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
      if (counter2 === 0) {
        clearInterval(intervalRef.current);
        return;
      }
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
      setCounter1((c) => ({ ...c, isCounting: false }));
      onStart("counter2");
    }
    if (type === "counter2") {
      setCounter2((c) => ({ ...c, isCounting: false }));
      onStart("counter1");
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
      } else {
        return;
      }
    } else {
      onStart("counter2");
    }
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
      <button className="button" onClick={handleCounterClickCounter1}>
        {convertToTime(counter1.value)}
      </button>
      <button className="button" onClick={handleCounterClickCounter2}>
        {convertToTime(counter2.value)}
      </button>
    </div>
  );
};
