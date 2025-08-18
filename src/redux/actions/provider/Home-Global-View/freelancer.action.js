import { placeABidConstants } from "../../constants";
import axios from "../../../helper/axios";

export const placeABidsFetch = () => async (dispatch) => {
  dispatch({ type: placeABidConstants.GET_REQ_REQUEST });

  try {
    const response = await axios.get(`/o/place-a-bid`);
    dispatch({
      type: placeABidConstants.GET_REQ_SUCCESS,
      payload: {
        message: response?.data?.message,
        projects: response?.data?.projects,
      },
    });
  } catch (error) {
    dispatch({
      type: placeABidConstants.GET_REQ_SUCCESS,
      payload: { message: error?.response?.data?.message || "Server error", error: error.status },
    });
  }
};