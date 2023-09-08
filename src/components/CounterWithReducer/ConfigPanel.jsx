import { useRef } from "react";

export const ConfigPanel = ({ onExit, onSet }) => {
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
