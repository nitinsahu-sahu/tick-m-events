import { eventConstants } from "../actions/constants";

const initialState = {
    stepper: 0,
    message: '',
    basicDetails: [],
    fullData: []
};

const eventReducer = (state, action) => {
    if (state === undefined) {
        state = initialState; // Assign initial state here
    }
    switch (action.type) {
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
