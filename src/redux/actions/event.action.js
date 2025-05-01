import { eventConstants } from "./constants";
import axios from "../helper/axios";

// Event customization
export const eventPublicationCreate = ({ formEventPublicatinData, eventId, ticketCustomId, eventCustomizationId }) => async (dispatch) => {

    dispatch({ type: eventConstants.PUBLISH_CREATE_REQUEST });

    try {
        const response = await axios.post(`/event/tickets/pvo/${eventId}/${ticketCustomId}//${eventCustomizationId}`, formEventPublicatinData);
        dispatch({
            type: eventConstants.PUBLISH_CREATE_SUCCESS,
            payload: {
                stepper: 4,
                message: response?.data?.message
            },
        });
        return {
            type: eventConstants.PUBLISH_CREATE_SUCCESS,
            message: response?.data?.message,
            status: response.status,
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