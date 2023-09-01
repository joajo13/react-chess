import { useRef, useState } from "react";
import "./Counter.css";

export const Counter = () => {
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);
  const intervalRef = useRef(null);
  const [isCounting1, setIsCounting1] = useState(false);
  const [isCounting2, setIsCounting2] = useState(false);

  const onStart = () => {
    intervalRef.current = setInterval(() => {
      setCounter1((c) => c + 1);
    }, 1000);
    setIsCounting1(true);
  };

  const onStop = () => {
    clearInterval(intervalRef.current);
    setIsCounting1(false);
  };

  const handleCounterClick = () => {
    if (!isCounting1) {
      onStart();
    } else {
      onStop();
    }
  };

  return (
    <div className="container">
      <input type="text" />
      <button className="counter" onClick={handleCounterClick}>
        {counter1}
      </button>
      <button className="counter" onClick={handleCounterClick}>
        {counter2}
      </button>
    </div>
  );
};
