import { authConstants } from "../actions/constants";

const initialState = {
    profile: {},
    services: [],
    message: '',
};

const profileServiceReducer = (state, action) => {
    if (state === undefined) {
        state = initialState; // Assign initial state here
    }
    switch (action.type) {
        case authConstants.GET_REQUEST:
            return { ...state };

        case authConstants.GET_SUCCESS:
            return {
                ...state,
                message: action.payload.message,
                profile: action.payload.profile,
                services: action.payload.services
            };

        case authConstants.GET_FAILURE:
            return {
                ...state,
                message: action.payload.message,
            };

        default:
            return state; // Always return a valid state
    }
};


export default profileServiceReducer;
