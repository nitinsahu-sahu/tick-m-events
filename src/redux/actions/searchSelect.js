import { searchSelectProviderConstants } from "./constants";
import axios from "../helper/axios";

export const providersListFetch = (data) => async (dispatch) => {
 
  dispatch({ type: searchSelectProviderConstants.GET_REQUEST });

  try {
    const response = await axios.get(`/auth/providers?serviceCategory=${data.serviceCategory}&location=${data.location}&search=${data.search}&certified=${data.certified}&rating=${data.rating}`);
    dispatch({
      type: searchSelectProviderConstants.GET_SUCCESS,
      payload: {
        message: response?.data?.message,
        providers: response?.data,
      },
    });
  } catch (error) {
    dispatch({
      type: searchSelectProviderConstants.GET_FAILURE,
      payload: { message: error?.response?.data?.message || "Server error", error: error.status },
    });
  }
};