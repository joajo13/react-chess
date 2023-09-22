import { useEffect, useReducer, useRef, useState } from "react";
import { counterReducer } from "../components/counterReducer";
import { ACTIONS } from "../ACTIONS";

const initialCounters = {
    finish: false,
    onSettings: false,
    onPause: false,
    started: false,
    extraSecs: 0,
    counter1: {
        id: "1",
        value: 300,
        isCounting: false,
    },
    counter2: {
        id: "2",
        value: 300,
        isCounting: false,
    },
};

export const useCounter = () => {
    const [counters, dispatch] = useReducer(counterReducer, initialCounters);
    const initialStateRef = useRef(initialCounters);

    const [countRender, setCountRender] = useState({
        counter1: initialStateRef.current.counter1.value,
        counter2: initialStateRef.current.counter1.value,
    });

    const intervalRef = useRef();


    const handleClick = ({ name }) => {

        if (counters.onPause) return;

        if (counters.finish) {
            return;
        }

        if (counters.started) {
            if (name === "counter1") {
                clearInterval(intervalRef.current);
                if (counters.counter2.isCounting) {
                    return;
                }

                setCountRender((state) => ({
                    ...state,
                    counter2: Number(state.counter2) + Number(counters.extraSecs),
                }));
            } else {
                clearInterval(intervalRef.current);
                if (counters.counter1.isCounting) {
                    return;
                }

                setCountRender((state) => ({
                    ...state,
                    counter1: Number(state.counter1) + Number(counters.extraSecs),
                }));
            }
        }

        if (name == "counter1") {
            intervalRef.current = setInterval(() => {
                setCountRender((state) => ({
                    ...state,
                    counter2: state.counter2 - 1,
                }));
            }, 1000);
        } else {
            intervalRef.current = setInterval(() => {
                setCountRender((state) => ({
                    ...state,
                    counter1: state.counter1 - 1,
                }));
            }, 1000);
        }

        const action = {
            type:
                name === "counter1" ? ACTIONS.START_COUNTER2 : ACTIONS.START_COUNTER1,
            payload: countRender,
        };

        dispatch(action);
    };

    const handlePlayClick = () => {
        if (counters.finish) return;

        if (!counters.counter1.isCounting && !counters.counter2.isCounting) return;

        if (counters.onPause) {

            if (counters.counter1.isCounting) {
                intervalRef.current = setInterval(() => {
                    setCountRender((state) => ({ ...state, counter1: state.counter1 - 1 }))
                }, 1000)
            } else {
                intervalRef.current = setInterval(() => {
                    setCountRender((state) => ({ ...state, counter2: state.counter2 - 1 }))
                }, 1000)
            }

        } else {
            clearInterval(intervalRef.current);
        }

        dispatch({ type: ACTIONS.PAUSE, payload: countRender });
    };

    const handleResetClick = () => {
        clearInterval(intervalRef.current);
        const action = {
            type: ACTIONS.RESET,
            payload: initialStateRef.current,
        };
        setCountRender({
            counter1: initialStateRef.current.counter1.value,
            counter2: initialStateRef.current.counter2.value,
        });
        dispatch(action);
    };

    const handleSettingsClick = () => {
        clearInterval(intervalRef.current);
        dispatch({ type: ACTIONS.SETTINGS });
        handlePlayClick();
    };

    const handleCloseSettings = () => {
        dispatch({ type: ACTIONS.SETTINGS });
    };

    const handleNewValues = (value, extraSecs) => {
        if (value === 0 && extraSecs === 0) {
            dispatch({ type: ACTIONS.SETTINGS });
            return;
        }
        setCountRender((state) => ({
            counter1: value || state.counter1,
            counter2: value || state.counter2,
        }));
        dispatch({ type: ACTIONS.SETNEW, payload: { value, extraSecs } });
    };

    useEffect(() => {
        if (countRender.counter1 <= 0 || countRender.counter2 <= 0) {
            clearInterval(intervalRef.current);
            dispatch({ type: ACTIONS.FINISHED, payload: countRender });
        }
    }, [countRender]);


    return {
        counters,
        countRender,
        handleClick,
        handlePlayClick,
        handleResetClick,
        handleSettingsClick,
        handleCloseSettings,
        handleNewValues,
    }
}
