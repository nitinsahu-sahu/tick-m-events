import { serviceReqConstants } from "./constants";
import axios from "../helper/axios";


export const serviceReqCreate = (formServiceData) => async (dispatch) => {
    dispatch({ type: serviceReqConstants.CREATE_REQUEST });

    try {
        const response = await axios.post("/service-request", formServiceData);

        dispatch({
            type: serviceReqConstants.CREATE_SUCCESS,
            payload: { message: response?.data?.message },

        });
        dispatch(fetchServiceReqUserId())
        return {
            type: serviceReqConstants.CREATE_SUCCESS,
            status: response.status,
            message: response?.data?.message
        };
    } catch (error) {
        dispatch({
            type: serviceReqConstants.CREATE_FAILURE,
            payload: { message: error?.response?.data?.message || "Server error", error: error.status },
        });

        return {
            type: serviceReqConstants.CREATE_FAILURE,
            message: error?.response?.data?.message || "Server error",
            status: error.status
        };
    }
};

export const fetchServiceReqUserId = () => async (dispatch) => {
    dispatch({ type: serviceReqConstants.GET_SERVICE_USERID_REQUEST });

    try {
        const response = await axios.get(`/service-request/userId`);
        dispatch({
            type: serviceReqConstants.GET_SERVICE_USERID_SUCCESS,
            payload: {
                message: "Fetch service successfully...",
                serviceRequests: response?.data?.serviceRequests,
            },
        });
    } catch (error) {
        dispatch({
            type: serviceReqConstants.GET_SERVICE_USERID_FAILURE,
            payload: { message: error?.response?.data?.message || "Server error", error: error.status },
        });
    }
};