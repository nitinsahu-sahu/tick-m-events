import { editeventConstants } from "./constants";
import axios from "../helper/axios";

export const editEventsFetch = () => async (dispatch) => {
    dispatch({ type: editeventConstants.GET_REQUEST });

    try {
        const response = await axios.get(`/o/edit-events`);
        dispatch({
            type: editeventConstants.GET_SUCCESS,
            payload: {
                message: response?.data?.message,
                eventsLists: response?.data?.eventsWithDetails,
            },

        });
    } catch (error) {
        dispatch({
            type: editeventConstants.GET_FAILURE,
            payload: {
                message: error?.response?.data?.message || "Server error",
                error: error.status
            },
        });
    }
};

export const deleteEvent = (selectedEventId) => async (dispatch) => {
    dispatch({ type: editeventConstants.DELETE_REQUEST });

    try {
        const response = await axios.delete(`/o/edit-events/${selectedEventId}`);
        dispatch({
            type: editeventConstants.DELETE_SUCCESS,
            payload: {
                message: response?.data?.message,
                eventsLists: response?.data?.eventsWithDetails,
            },

        });
        dispatch(editEventsFetch())
    } catch (error) {
        dispatch({
            type: editeventConstants.DELETE_FAILURE,
            payload: { message: error?.response?.data?.message || "Server error", error: error.status },
        });
    }
};

export const updateEvent = (selectedEventId, formData) => async (dispatch) => {
    dispatch({ type: editeventConstants.UPDATE_REQUEST });

    try {
        const response = await axios.patch(`/o/edit-events/${selectedEventId}`, formData);
        
        dispatch({
            type: editeventConstants.UPDATE_SUCCESS,
            payload: {
                message: response?.data?.message,
                eventsLists: response?.data?.eventsWithDetails,
            },

        });
        dispatch(editEventsFetch())
    } catch (error) {
        dispatch({
            type: editeventConstants.UPDATE_FAILURE,
            payload: { message: error?.response?.data?.message || "Server error", error: error.status },
        });
    }
};