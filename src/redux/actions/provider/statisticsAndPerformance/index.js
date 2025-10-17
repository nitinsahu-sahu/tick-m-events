import axios from "../../../helper/axios";
import { statisticsPerformanceConstants } from "../../constants";

export const statisticsPerformanceFetch = () => async (dispatch) => {
  dispatch({ type: statisticsPerformanceConstants.GET_REQUEST });

  try {
    const response = await axios.get(`/p/statistics`);
    console.log('ss',response.data);
    
    dispatch({
      type: statisticsPerformanceConstants.GET_SUCCESS,
      payload: {
        message: response?.data?.message,
        allOrders: response?.data?.allOrders,
        verifiedOrders: response?.data?.verifiedOrders,
      },
    });
  } catch (error) {
    dispatch({
      type: statisticsPerformanceConstants.GET_FAILURE,
      payload: { message: error?.response?.data?.message || "Server error", error: error.status },
    });
  }
};