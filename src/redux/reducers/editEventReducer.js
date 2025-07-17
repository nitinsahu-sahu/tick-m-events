import { editeventConstants } from "../actions/constants";

const initialState = {
    message: '',
    eventsLists: [],
    error: null,
    loading: true
};

const editEventReducer = (state, action) => {
    if (state === undefined) {
        state = initialState; // Assign initial state here
    }
    switch (action.type) {
        case editeventConstants.GET_REQUEST:
            return { ...state, loading: true };

        case editeventConstants.GET_SUCCESS:
            return {
                ...state,
                eventsLists: action.payload.eventsLists,
                message: action.payload.message,
                loading: false
            };

        case editeventConstants.GET_FAILURE:
            return {
                ...state,
                message: action.payload.message,
                loading: true
            };

        default:
            return state; // Always return a valid state
    }
};


export default editEventReducer;
