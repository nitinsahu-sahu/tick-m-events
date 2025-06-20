
import { activityConstants } from "./constants";
import axios from "../helper/axios";

export const fetchLoginActivities = () => async (dispatch) => {
    dispatch({ type: activityConstants.FETCH_ACTIVITIES_REQUEST });

    try {
        const response = await axios.get("/activities/message-notification");

        dispatch({
            type: activityConstants.FETCH_ACTIVITIES_SUCCESS,
            payload: response.data.data,
        });

        return {
            type: activityConstants.FETCH_ACTIVITIES_SUCCESS,
            status: response.status,
            message: response.data.message,
            payload: response.data.data, 
        };

    } catch (error) {
        dispatch({
            type: activityConstants.FETCH_ACTIVITIES_FAILURE,
            payload: {
                message: error?.response?.data?.message || "Failed to fetch activities",
                error: error.status,
            },
        });

        return {
            type: activityConstants.FETCH_ACTIVITIES_FAILURE,
            message: error?.response?.data?.message || "Failed to fetch activities",
            status: error.status,
        };
    }
};
