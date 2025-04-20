import { eventConstants } from "./constants";
import axios from "../helper/axios";

// Checking SINGUP login or not
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
            message: response?.data?.message
        };
    } catch (error) {
        dispatch({
            type: eventConstants.EVENT_CREATE_FAILURE,
            payload: { message: error?.response?.data?.message || "Server error", error: error.status },
        });
        return null; // or return an error object if you prefer
    }
};