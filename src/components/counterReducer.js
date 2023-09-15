import { ACTIONS } from "../ACTIONS";

export const counterReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {

        case ACTIONS.START_COUNTER1:
            return {
                ...state,
                started: true,
                onPause: false,
                counter2: {
                    ...state.counter2,
                    isCounting: false,
                },
                counter1: {
                    ...state.counter1,
                    value: payload.counter1,
                    isCounting: true,
                }
            }

        case ACTIONS.START_COUNTER2:
            return {
                ...state,
                started: true,
                onPause: false,
                counter1: {
                    ...state.counter1,
                    isCounting: false,
                },
                counter2: {
                    ...state.counter2,
                    value: payload.counter2,
                    isCounting: true,
                }
            }

        // case ACTIONS.STOP:
        //     return {
        //         ...state,
        //         onPause: true,
        //         counter1: {
        //             ...state.counter1,
        //             value: payload.counter1,
        //             isCounting: false
        //         },
        //         counter2: {
        //             ...state.counter2,
        //             value: payload.counter2,
        //             isCounting: false
        //         }
        //     }

        case ACTIONS.RESET:
            return payload

        case ACTIONS.SETTINGS:
            return {
                ...state,
                onSettings: !state.onSettings,
            }

        case ACTIONS.SETNEW:
            return {
                ...state,
                started: false,
                onSettings: false,
                extraSecs: payload.extraSecs || state.extraSecs,
                counter1: {
                    ...state.counter1,
                    value: payload.value || state.counter1.value,
                    isCounting: false
                },
                counter2: {
                    ...state.counter2,
                    value: payload.value || state.counter2.value,
                    isCounting: false
                }
            }

        case ACTIONS.PAUSE:
            return {
                ...state,
                onPause: !state.onPause,
                counter1: {
                    ...state.counter1,
                    value: payload.counter1,
                },
                counter2: {
                    ...state.counter2,
                    value: payload.counter2,
                }
            }

        case ACTIONS.FINISHED:
            return {
                ...state,
                finish: true,
                counter1: {
                    ...state.counter1,
                    isCounting: false,
                },
                counter2: {
                    ...state.counter2,
                    isCounting: false,
                }
            }

        default:
            return state;
    }
}

