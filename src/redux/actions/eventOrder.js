import { eventOrderConstants } from "./constants";
import axios from "../helper/axios";

// Create order
export const eventOrderCreate = (orderFormEntry) => async (dispatch) => {

    dispatch({ type: eventOrderConstants.CREATE_REQUEST });

    try {
        const response = await axios.post(`/event-order/order`, orderFormEntry);
        console.log(response);

        dispatch({
            type: eventOrderConstants.CREATE_SUCCESS,
            payload: {
                message: response?.data?.message,
                order: response?.data.savedOrder
            },
        });
        return {
            type: eventOrderConstants.CREATE_SUCCESS,
            message: response?.data?.message,
            order: response?.data.savedOrder,
            status: response.status,
        };
    } catch (error) {
        console.log(error);

        dispatch({
            type: eventOrderConstants.CREATE_FAILURE,
            payload: { message: error?.response?.data?.message || "Server error", error: error.status },
        });
        return {
            type: eventOrderConstants.CREATE_FAILURE,
            message: error?.response?.data?.message,
            status: error?.response.status,
        };
    }
};