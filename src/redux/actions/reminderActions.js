import { reminderConstants } from './constants';
import axios from '../helper/axios';

export const saveReminderSettings = (data) => async (dispatch) => {
    dispatch({ type: reminderConstants.SAVE_REQUEST });

    try {
        const response = await axios.post("/reminder", data);

        dispatch({
            type: reminderConstants.SAVE_SUCCESS,
            payload: { message: response?.data?.message },
        });

        return {
            type: reminderConstants.SAVE_SUCCESS,
            status: response.status,
            message: response?.data?.message
        };
    } catch (error) {
        dispatch({
            type: reminderConstants.SAVE_FAILURE,
            payload: { message: error?.response?.data?.message || "Server error", error: error.status },
        });

        return {
            type: reminderConstants.SAVE_FAILURE,
            status: error.status,
            message: error?.response?.data?.message || "Server error"
        };
    }
};
