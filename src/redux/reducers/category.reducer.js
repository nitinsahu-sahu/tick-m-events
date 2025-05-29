import { eventCategoryConstants } from "../actions/constants";

const initialState = {
    message: '',
    categories: []
};

const eventCategoryReducer = (state, action) => {
    if (state === undefined) {
        state = initialState; // Assign initial state here
    }
    switch (action.type) {
        // Event bY ID FETCH
        case eventCategoryConstants.GET_REQUEST:
            return { ...state };

        case eventCategoryConstants.GET_SUCCESS:
            return {
                ...state,
                message: action.payload.message,
                categories: action.payload.categories,
            };

        case eventCategoryConstants.GET_FAILURE:
            return {
                ...state,
                message: action.payload.message,
            };
        default:
            return state; // Always return a valid state
    }
};


export default eventCategoryReducer;
