import { useEffect, useRef } from "react";
import "./ConfigPanel.css";
import { toast } from "sonner";
export const ConfigPanel = ({ onClose, onSet }) => {
  const timeRef = useRef(0);
  const extraTimeRef = useRef(0);

  const validation = () => {
    if (timeRef.current.value == 0 && extraTimeRef.current.value == 0) {
      toast.error("Please, fill all the fields or quit the settings.");
      return;
    }
    onSet(Number(timeRef.current.value), Number(extraTimeRef.current.value));
  };

  return (
    <div className="config-card slide-top ">
      <h2>Settings</h2>
      <button className="button-x" onClick={onClose}>
        <img src="/icons/close.svg" />
      </button>
      <input ref={timeRef} type="number" id="1" placeholder="Time..." min={0} />
      <input
        ref={extraTimeRef}
        type="number"
        id="2"
        placeholder="Extra time..."
        min={0}
      />
      <button className="button-set" onClick={validation}>
        Done
      </button>
    </div>
  );
};
