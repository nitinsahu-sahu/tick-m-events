import { serviceRequestConstants } from "../actions/constants";

const initialState = {
    message: '',
    requests:[],
    error:''
};

const eventServiceRequestReducer = (state, action) => {
    if (state === undefined) {
        state = initialState; // Assign initial state here
    }
    switch (action.type) {
        // Event bY ID FETCH
        case serviceRequestConstants.GET_REQUESTED_SERVICE_REQUEST:
            return { ...state };

        case serviceRequestConstants.GET_REQUESTED_SERVICE_SUCCESS:
            return {
                ...state,
                message: action.payload.message,
                requests: action.payload.requests,
            };

        case serviceRequestConstants.GET_REQUESTED_SERVICE_FAILURE:
            return {
                ...state,
                message: action.payload.message,
                error: action.payload.error,
            };
        default:
            return state; // Always return a valid state
    }
};


export default eventServiceRequestReducer;
