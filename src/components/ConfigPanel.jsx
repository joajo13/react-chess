import { useRef } from "react";
import "./ConfigPanel.css";
export const ConfigPanel = ({ onClose, onSet }) => {
  const timeRef = useRef();
  const extraTimeRef = useRef();
  return (
    <div className="config-card slide-top ">
      <h2>Settings</h2>
      <button className="button-x" onClick={onClose}>
        <img src="/public/icons/close.svg" />
      </button>
      <input ref={timeRef} type="number" id="1" placeholder="Time..." min={0} />
      <input
        ref={extraTimeRef}
        type="text"
        id="2"
        placeholder="Extra time..."
        min={0}
      />
      <button
        className="button-set"
        onClick={() => onSet(timeRef.current.value, extraTimeRef.current.value)}
      >
        Done
      </button>
    </div>
  );
};
