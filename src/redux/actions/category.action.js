import { eventCategoryConstants } from "./constants";
import axios from "../helper/axios";


export const eventCategoryFetch = () => async (dispatch) => {
  dispatch({ type: eventCategoryConstants.GET_REQUEST });

  try {
    const response = await axios.get(`/event/allCategory`);
    dispatch({
      type: eventCategoryConstants.GET_SUCCESS,
      payload: {
        message: response?.data?.message,
        categories: response?.data?.categories,
      },
    });
  } catch (error) {
    dispatch({
      type: eventCategoryConstants.GET_FAILURE,
      payload: { message: error?.response?.data?.message || "Server error", error: error.status },
    });
  }
};

