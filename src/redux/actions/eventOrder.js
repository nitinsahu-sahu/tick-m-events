import { eventOrderConstants } from "./constants";
import axios from "../helper/axios";

export const eventOrderCreate = (orderFormEntry) => async (dispatch) => {

    dispatch({ type: eventOrderConstants.CREATE_REQUEST });

    try {
        const response = await axios.post(`/event-order/order`, orderFormEntry);
        dispatch({
            type: eventOrderConstants.CREATE_SUCCESS,
            payload: {
                message: response?.data?.message
            },
        });
        return {
            type: eventOrderConstants.CREATE_SUCCESS,
            message: response?.data?.message,
            status: response.status,
        };
    } catch (error) {
        dispatch({
            type: eventOrderConstants.CREATE_FAILURE,
            payload: { message: error?.response?.data?.message || "Server error", error: error.status },
        });
        return null; // or return an error object if you prefer
    }
};