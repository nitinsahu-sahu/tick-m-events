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