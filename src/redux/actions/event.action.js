import { eventConstants } from "./constants";
import axios from "../helper/axios";

export const eventUpdate = (updatedEvent) => async (dispatch) => {
 
    const eventId = updatedEvent?._id
    dispatch({ type: eventConstants.EVENT_UPDATE_REQUEST });

    try {
        const response = await axios.patch(`/event/${eventId}`, updatedEvent);
        dispatch({
            type: eventConstants.EVENT_UPDATE_SUCCESS,
            payload: { message: response?.data?.message },

        });
        dispatch(eventFetch())
        return {
            type: eventConstants.EVENT_UPDATE_SUCCESS,
            status: response.status,
            message: response?.data?.message
        };
    } catch (error) {
        dispatch({
            type: eventConstants.EVENT_UPDATE_FAILURE,
            payload: { message: error?.response?.data?.message || "Server error", error: error.status },
        });

        return {
            type: eventConstants.EVENT_UPDATE_FAILURE,
            message: error?.response?.data?.message || "Server error",
            status: error.status
        };
    }
};

export const eventFetch = () => async (dispatch) => {
    dispatch({ type: eventConstants.EVENT_GET_REQUEST });

    try {
        const response = await axios.get(`/event`);
        dispatch({
            type: eventConstants.EVENT_GET_SUCCESS,
            payload: {
                message: response?.data?.message,
                basicDetails: response?.data?.basicDetails,
            },

        });
        return {
            type: eventConstants.EVENT_GET_SUCCESS,
            basicDetails: response?.data?.basicDetails,
            message: response?.data?.message,
        };
    } catch (error) {
        dispatch({
            type: eventConstants.EVENT_GET_FAILURE,
            payload: { message: error?.response?.data?.message || "Server error", error: error.status },
        });

        return {
            type: eventConstants.EVENT_GET_FAILURE,
            message: error?.response?.data?.message || "Server error",
            status: error.status
        };
    }
};

// Event customization
export const eventPublicationCreate = ({ formEventPublicatinData, eventId, ticketCustomId, eventCustomizationId }) => async (dispatch) => {

    dispatch({ type: eventConstants.PUBLISH_CREATE_REQUEST });

    try {
        const response = await axios.post(`/event/tickets/pvo/${eventId}/${ticketCustomId}/${eventCustomizationId}`, formEventPublicatinData);
        // const response = await axios.post('/event/tickets/pvo/681487601fc496cd15aa9c30/681487bf1fc496cd15aa9c36/681487da1fc496cd15aa9c3a', formEventPublicatinData);
        dispatch({
            type: eventConstants.PUBLISH_CREATE_SUCCESS,
            payload: {
                stepper: 0,
                message: response?.data?.message
            },
        });
        return {
            type: eventConstants.PUBLISH_CREATE_SUCCESS,
            message: response?.data?.message,
            status: response.status,
            stepper: 0,

        };
    } catch (error) {
        dispatch({
            type: eventConstants.PUBLISH_CREATE_FAILURE,
            payload: { message: error?.response?.data?.message || "Server error", error: error.status },
        });
        return null; // or return an error object if you prefer
    }
};

// Event customization
export const eventCustomizationCreate = ({ formEventCustomizeData, eventId, ticketConfigId }) => async (dispatch) => {

    dispatch({ type: eventConstants.EVENT_CUSTOMIZTION_CREATE_REQUEST });

    try {
        const response = await axios.post(`/event/tickets/ec/${eventId}/${ticketConfigId}`, formEventCustomizeData);
        console.log(response);

        dispatch({
            type: eventConstants.EVENT_CUSTOMIZTION_CREATE_SUCCESS,
            payload: {
                stepper: 3,
                message: response?.data?.message
            },
        });
        return {
            type: eventConstants.EVENT_CUSTOMIZTION_CREATE_SUCCESS,
            stepper: 3,
            message: response?.data?.message,
            eventCustomizationId: response?.data?.eventCustomizationId
        };
    } catch (error) {
        dispatch({
            type: eventConstants.EVENT_CUSTOMIZTION_CREATE_FAILURE,
            payload: { message: error?.response?.data?.message || "Server error", error: error.status },
        });
        return null; // or return an error object if you prefer
    }
};

// Event creating
export const eventCreate = (data) => async (dispatch) => {
    dispatch({ type: eventConstants.EVENT_CREATE_REQUEST });

    try {
        const response = await axios.post("/event", data);
        dispatch({
            type: eventConstants.EVENT_CREATE_SUCCESS,
            payload: {
                stepper: 1,
                message: response?.data?.message
            },
        });
        return {
            type: eventConstants.EVENT_CREATE_SUCCESS,
            stepper: 1,
            message: response?.data?.message,
            eventId: response?.data?.eventId
        };
    } catch (error) {
        dispatch({
            type: eventConstants.EVENT_CREATE_FAILURE,
            payload: { message: error?.response?.data?.message || "Server error", error: error.status },
        });
        return null; // or return an error object if you prefer
    }
};

// Event config
export const ticketConfigCreate = ({ formEventData, eventId }) => async (dispatch) => {
    dispatch({ type: eventConstants.TICKET_CONFIG_CREATE_REQUEST });

    try {
        const response = await axios.post(`/event/tickets/${eventId}`, formEventData);
        dispatch({
            type: eventConstants.TICKET_CONFIG_CREATE_SUCCESS,
            payload: {
                stepper: 2,
                message: response?.data?.message
            },
        });
        return {
            type: eventConstants.TICKET_CONFIG_CREATE_SUCCESS,
            stepper: 2,
            message: response?.data?.message,
            ticketConfigId: response?.data?.ticketConfigId
        };
    } catch (error) {
        dispatch({
            type: eventConstants.TICKET_CONFIG_CREATE_FAILURE,
            payload: { message: error?.response?.data?.message || "Server error", error: error.status },
        });
        return null; // or return an error object if you prefer
    }
};