import { organizerEventConstants } from "../../actions/constants";

const initialState = {
    message: '',
    __events: [],
    error: null,
    loading: true
};

const pageEventReducer = (state, action) => {
    if (state === undefined) {
        state = initialState; // Assign initial state here
    }
    switch (action.type) {
        case organizerEventConstants.GET_ORGANIZR_EVENTS_REQUEST:
            return { ...state, loading: true };

        case organizerEventConstants.GET_ORGANIZR_EVENTS_SUCCESS:
            return {
                ...state,
                __events: action.payload.__event,
                message: action.payload.message,
                loading: false
            };

        case organizerEventConstants.GET_ORGANIZR_EVENTS_FAILURE:
            return {
                ...state,
                message: action.payload.message,
                loading: true
            };

        default:
            return state; // Always return a valid state
    }
};


export default pageEventReducer;
