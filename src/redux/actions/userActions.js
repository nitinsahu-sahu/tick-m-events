import { userConstants } from "./constants";
import axios from "../helper/axios";

export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: userConstants.GET_USERS_REQUEST });

        const { data } = await axios.get('/admin');

        dispatch({
            type: userConstants.GET_USERS_SUCCESS,
            payload: data.data, 
        });
    } catch (error) {
        dispatch({
            type: userConstants.GET_USERS_FAIL,
            payload:
                error.response?.data?.message || error.message,
        });
    }
};
