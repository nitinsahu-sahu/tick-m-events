import { eventConstants } from "../actions/constants";

const initialState = {
    stepper: 0,
    message: '',
    basicDetails: [],
    fullData: [],
    wishlist: [],
    eventWithDetails: {}
};

const eventReducer = (state, action) => {
    if (state === undefined) {
        state = initialState; // Assign initial state here
    }
    switch (action.type) {
        // Event bY ID FETCH
        case eventConstants.EVENT_BY_ID_REQUEST:
            return { ...state };

        case eventConstants.EVENT_BY_ID_SUCCESS:
            return {
                ...state,
                eventWithDetails: action.payload.eventWithDetails,
            };

        case eventConstants.EVENT_BY_ID_FAILURE:
            return {
                ...state,
                message: action.payload.message,
            };

        // Event Wishlist fetch
        case eventConstants.WISHLIST_GET_REQUEST:
            return { ...state };

        case eventConstants.WISHLIST_GET_SUCCESS:
            return {
                ...state,
                wishlist: action.payload.wishlist,
            };

        case eventConstants.WISHLIST_GET_FAILURE:
            return {
                ...state,
                message: action.payload.message,
            };

        // Event Create
        case eventConstants.EVENT_CREATE_REQUEST:
            return { ...state };

        case eventConstants.EVENT_CREATE_SUCCESS:
            return {
                ...state,
                stepper: action.payload.stepper,
            };

        case eventConstants.EVENT_CREATE_FAILURE:
            return {
                ...state,
                message: action.payload.message,
            };

        // Get Events
        case eventConstants.EVENT_GET_REQUEST:
            return { ...state };

        case eventConstants.EVENT_GET_SUCCESS:
            return {
                ...state,
                basicDetails: action.payload.basicDetails,
                fullData: action.payload.fullData,
            };

        case eventConstants.EVENT_GET_FAILURE:
            return {
                ...state,
                message: action.payload.message,
            };

        // Event Ticket Create
        case eventConstants.TICKET_CONFIG_CREATE_REQUEST:
            return { ...state };

        case eventConstants.TICKET_CONFIG_CREATE_SUCCESS:
            return {
                ...state,
                stepper: action.payload.stepper,
            };

        case eventConstants.TICKET_CONFIG_CREATE_FAILURE:
            return {
                ...state,
                message: action.payload.message,
            };

        // Event Ticket Custommization Create
        case eventConstants.EVENT_CUSTOMIZTION_CREATE_REQUEST:
            return { ...state };

        case eventConstants.EVENT_CUSTOMIZTION_CREATE_SUCCESS:
            return {
                ...state,
                stepper: action.payload.stepper,
            };

        case eventConstants.EVENT_CUSTOMIZTION_CREATE_FAILURE:
            return {
                ...state,
                message: action.payload.message,
            };

        // Event publication Create
        case eventConstants.PUBLISH_CREATE_REQUEST:
            return { ...state };

        case eventConstants.PUBLISH_CREATE_SUCCESS:
            return {
                ...state,
                stepper: action.payload.stepper,
            };

        case eventConstants.PUBLISH_CREATE_FAILURE:
            return {
                ...state,
                message: action.payload.message,
            };
        default:
            return state; // Always return a valid state
    }
};


export default eventReducer;
