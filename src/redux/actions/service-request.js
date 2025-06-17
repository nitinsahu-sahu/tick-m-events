import { serviceRequestConstants } from "./constants";
import axios from "../helper/axios";

// Event creating
export const getRequestsByProvider = (request) => async (dispatch) => {
    dispatch({ type: serviceRequestConstants.GET_REQUESTED_SERVICE_REQUEST });

    try {
        const response = await axios.get("/event-requests");
        dispatch({
            type: serviceRequestConstants.GET_REQUESTED_SERVICE_SUCCESS,
            payload: {
                message: response?.data?.message,
                requests: response?.data?.requests
            },
        });
    } catch (error) {
        dispatch({
            type: serviceRequestConstants.GET_REQUESTED_SERVICE_FAILURE,
            payload: { message: error?.response?.data?.message || "Server error", error: error.status },
        });
    }
};

// Event creating
export const organizerRequstToProvider = (request) => async (dispatch) => {
    dispatch({ type: serviceRequestConstants.ORGANIZER_SERVICE_TO_PROVIDER_REQUEST });

    try {
        const response = await axios.post("/event-requests", request);
        dispatch({
            type: serviceRequestConstants.ORGANIZER_SERVICE_TO_PROVIDER_SUCCESS,
            payload: {
                message: response?.data?.message
            },
        });
        return {
            type: serviceRequestConstants.ORGANIZER_SERVICE_TO_PROVIDER_SUCCESS,
            message: response?.data?.message,
            status: response?.status,
        };
    } catch (error) {
        dispatch({
            type: serviceRequestConstants.ORGANIZER_SERVICE_TO_PROVIDER_FAILURE,
            payload: { message: error?.response?.data?.message || "Server error", error: error.status },
        });
        return {
            type: serviceRequestConstants.ORGANIZER_SERVICE_TO_PROVIDER_FAILURE,
            message: error?.response?.data?.message,
            status: error?.status
        };
    }
};