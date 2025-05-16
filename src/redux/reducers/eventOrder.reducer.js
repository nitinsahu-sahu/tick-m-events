import { eventOrderConstants } from "../actions/constants";

const initialState = {
    message: '',
    order: {}
};

const eventOrderReducer = (state, action) => {
    if (state === undefined) {
        state = initialState; // Assign initial state here
    }
    switch (action.type) {
        // Event bY ID FETCH
        case eventOrderConstants.CREATE_REQUEST:
            return { ...state };

        case eventOrderConstants.CREATE_SUCCESS:
            return {
                ...state,
                message: action.payload.message,
                order: action.payload.order,
            };

        case eventOrderConstants.CREATE_FAILURE:
            return {
                ...state,
                message: action.payload.message,
            };
        default:
            return state; // Always return a valid state
    }
};


export default eventOrderReducer;
