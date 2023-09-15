import { useRef } from "react";
import "./ConfigPanel.css";
export const ConfigPanel = ({ onClose, onSet }) => {
  const timeRef = useRef();
  const extraTimeRef = useRef();
  return (
    <div className="config-card scale-up-center ">
      <button className="button-x" onClick={onClose}>
        <img src="/src/assets/close.svg" />
      </button>
      <label htmlFor="1">Set time</label>
      <input
        ref={timeRef}
        type="text"
        id="1"
        placeholder="seconds..."
        min={0}
      />
      <label htmlFor="2">Set extra time</label>
      <input
        ref={extraTimeRef}
        type="text"
        id="2"
        placeholder="seconds..."
        min={0}
      />
      <button
        className="button-set"
        onClick={() => onSet(timeRef.current.value, extraTimeRef.current.value)}
      >
        Set
      </button>
    </div>
  );
};
