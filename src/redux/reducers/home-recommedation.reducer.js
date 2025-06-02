import { homeAndRecomConstants } from "../actions/constants";

const initialState = {
    message: '',
    upcomingEvents: [],
    popularEvents: [],
    recommendedEvents: [],
    latestEvents:[]
};

const homeAndRecommandationReducer = (state, action) => {
    if (state === undefined) {
        state = initialState; // Assign initial state here
    }
    switch (action.type) {
        // Event bY ID FETCH
        case homeAndRecomConstants.GET_REQUEST:
            return { ...state };

        case homeAndRecomConstants.GET_SUCCESS:
            return {
                ...state,
                message: action.payload.message,
                upcomingEvents: action.payload.upcomingEvents,
                popularEvents: action.payload.popularEvents,
                recommendedEvents: action.payload.recommendedEvents,
                latestEvents:action.payload.latestEvents,
            };

        case homeAndRecomConstants.GET_FAILURE:
            return {
                ...state,
                message: action.payload.message,
            };
        default:
            return state; // Always return a valid state
    }
};


export default homeAndRecommandationReducer;
