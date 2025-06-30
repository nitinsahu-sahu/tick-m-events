import { serviceReqConstants } from "../actions/constants";

const initialState = {
    message: '',
    categories: [],
    loading: true
};

const serveiceRequestReducer = (state, action) => {
    if (state === undefined) {
        state = initialState; // Assign initial state here
    }
    switch (action.type) {
        case serviceReqConstants.GET_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case serviceReqConstants.GET_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: action.payload.categories,
            };

        case serviceReqConstants.GET_CATEGORY_FAILURE:
            return {
                ...state,
                loading: true,
                error: action.payload.message,
            };
        
        default:
            return state; // Always return a valid state
    }
};


export default serveiceRequestReducer;
