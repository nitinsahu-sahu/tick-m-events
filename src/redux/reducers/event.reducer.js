import { eventConstants } from "../actions/constants";

const initialState = {
    stepper: 0,
    message: '',
    basicDetails: [],
    fullData: [],
    wishlist: [],
    eventWithDetails: {},
    categories: [],
    loadingCategories: false,
    childCategories: [],
    loadingChildCategories: false,
    error: null,
};

const eventReducer = (state, action) => {
    if (state === undefined) {
        state = initialState; // Assign initial state here
    }
    switch (action.type) {
        case eventConstants.EVENT_CATEGORY_FETCH_REQUEST:
            return {
                ...state,
                loadingCategories: true,
                error: null,
            };

        case eventConstants.EVENT_CATEGORY_FETCH_SUCCESS:
            return {
                ...state,
                loadingCategories: false,
                categories: action.payload.categories,
            };

        case eventConstants.EVENT_CATEGORY_FETCH_FAILURE:
            return {
                ...state,
                loadingCategories: false,
                error: action.payload.message,
            };
        case eventConstants.CHILD_CATEGORY_FETCH_REQUEST:
            return {
                ...state,
                loadingChildCategories: true,
                error: null,
            };

        case eventConstants.CHILD_CATEGORY_FETCH_SUCCESS:
            return {
                ...state,
                loadingChildCategories: false,
                childCategories: action.payload.childCategories,
            };

        case eventConstants.CHILD_CATEGORY_FETCH_FAILURE:
            return {
                ...state,
                loadingChildCategories: false,
                error: action.payload.message,
            };

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
