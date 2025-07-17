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
            payload: { message: error?.response?.data?.message || "Server error", error: error.status },
        });
    }
};