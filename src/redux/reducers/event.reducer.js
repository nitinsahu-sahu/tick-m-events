import { eventConstants } from "../actions/constants";

const initialState = {
    stepper: 1,
    message: '',
};

const eventReducer = (state, action) => {
    if (state === undefined) {
        state = initialState; // Assign initial state here
    }
    switch (action.type) {
        case eventConstants.EVENT_CREATE_REQUEST:
            return { ...state };

        case eventConstants.EVENT_CREATE_SUCCESS:
            return {
                ...state,
                stepper: action.payload.stepper,
                token: action.payload.token
            };

        case eventConstants.EVENT_CREATE_FAILURE:
            return {
                ...state,
                message: action.payload.message,
            };

        default:
            return state; // Always return a valid state
    }
};


export default eventReducer;
