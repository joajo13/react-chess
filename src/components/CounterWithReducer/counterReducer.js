import { ACTIONS } from "./ACTIONS";

export const counterReducer = (initialState = [], action) => {
    switch (action.type) {

        case ACTIONS.START_COUNTER1:
            console.log(initialState)
            return {
                ...initialState,
                counter1: {
                    ...initialState.counter1,
                    value: action.payload.counter1,
                    isCounting: true,
                },
            }

        case ACTIONS.START_COUNTER2:
            return {
                ...initialState,
                counter2: {
                    ...initialState.counter1,
                    value: action.payload.counter1,
                    isCounting: true,
                },
            }

        case ACTIONS.STOP:
            return {
                counter1: {
                    ...initialState.counter1,
                    isCounting: false,
                },
                counter2: {
                    ...initialState.counter2,
                    isCounting: false,
                }
            }

        case ACTIONS.STOP_COUNTER1:
            return {
                ...initialState,
                counter1: {}
            }

        default:
            return initialState;
    }
}

