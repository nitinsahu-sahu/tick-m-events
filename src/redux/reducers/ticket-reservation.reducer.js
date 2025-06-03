import { ticketTypeConstants } from "../actions/constants";

const initialState = {
    message: '',
    tickets: []
};

const ticketTypeReducer = (state, action) => {
    if (state === undefined) {
        state = initialState; // Assign initial state here
    }
    switch (action.type) {
        // Event bY ID FETCH
        case ticketTypeConstants.GET_REQUEST:
            return { ...state };

        case ticketTypeConstants.GET_SUCCESS:
            return {
                ...state,
                message: action.payload.message,
                tickets: action.payload.data,
            };

        case ticketTypeConstants.GET_FAILURE:
            return {
                ...state,
                message: action.payload.message,
            };
        default:
            return state; // Always return a valid state
    }
};


export default ticketTypeReducer;
