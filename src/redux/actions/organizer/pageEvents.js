import { organizerEventConstants } from "../constants";
import axios from "../../helper/axios";

export const fatchOrgEvents = () => async (dispatch) => {
    dispatch({ type: organizerEventConstants.GET_ORGANIZR_EVENTS_REQUEST });

    try {
        const response = await axios.get("/o/event-com")

        dispatch({
            type: organizerEventConstants.GET_ORGANIZR_EVENTS_SUCCESS,
            payload: {
                message: response?.data?.message,
                __event: response?.data?.__event,
            },

        });
    } catch (error) {
        dispatch({
            type: organizerEventConstants.GET_ORGANIZR_EVENTS_FAILURE,
            payload: {
                message: error?.response?.data?.message || "Server error",
                error: error.status
            },
        });
    }
};

export const fatchOrgPlaceABids = (eventId) => async (dispatch) => {
    dispatch({ type: organizerEventConstants.GET_PLACEABID_REQUEST });

    try {
        const response = await axios.get(`/o/event/${eventId}/bid-data`)

        dispatch({
            type: organizerEventConstants.GET_PLACEABID_SUCCESS,
            payload: {
                message: response?.data?.message,
                __event: response?.data?.__event,
            },

        });
    } catch (error) {
        dispatch({
            type: organizerEventConstants.GET_PLACEABID_FAILURE,
            payload: {
                message: error?.response?.data?.message || "Server error",
                error: error.status
            },
        });
    }
};

export const fatchOrgProjectBids = (projectId) => async (dispatch) => {
    dispatch({ type: organizerEventConstants.GET_BIDS_REQUEST });

    try {
        const response = await axios.get(`/o/place-a-bid/${projectId}/bid-data`)
        dispatch({
            type: organizerEventConstants.GET_BIDS_SUCCESS,
            payload: {
                message: response?.data?.message,
                projectWithBids: response?.data?.data,
            },

        });
    } catch (error) {
        dispatch({
            type: organizerEventConstants.GET_BIDS_FAILURE,
            payload: {
                message: error?.response?.data?.message || "Server error",
                error: error.status
            },
        });
    }
};

export const assignProjectToProvider = (data,projectId, bidId) => async (dispatch) => {
     console.log("response", projectId, bidId, data);

    dispatch({ type: organizerEventConstants.ASSIGN_PROJECT_REQUEST });

    try {
        const response = await axios.put(`/o/place-a-bid/${projectId}/${bidId}`, {data})
        console.log(response);

        dispatch({
            type: organizerEventConstants.ASSIGN_PROJECT_SUCCESS,
            payload: {
                message: response?.data?.message,
                projectWithBids: response?.data?.data,
            },

        });
        dispatch(fatchOrgProjectBids(projectId))

        return {
            type: organizerEventConstants.ASSIGN_PROJECT_SUCCESS,
            message: response?.response?.data?.message || "Failed to fetch activities",
            status: response.status,
        };

    } catch (error) {
        console.log(error);

        dispatch({
            type: organizerEventConstants.ASSIGN_PROJECT_FAILURE,
            payload: {
                message: error?.response?.data?.message || "Server error",
                error: error.status
            },
        });
        return {
            type: organizerEventConstants.ASSIGN_PROJECT_FAILURE,
            message: error?.response?.data?.message || "Failed to fetch activities",
            status: error.status,
        };

    }
}
