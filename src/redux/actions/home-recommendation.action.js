import { homeAndRecomConstants } from "./constants";
import axios from "../helper/axios";

export const recommTrandingPopularEventFetch = () => async (dispatch) => {
    dispatch({ type: homeAndRecomConstants.GET_REQUEST });

    try {
        const response = await axios.get('/home-recommendations');
      
        dispatch({
            type: homeAndRecomConstants.GET_SUCCESS,
            payload: {
                message: response?.data?.message,
                upcomingEvents: response?.data?.upcomingEvents,
                popularEvents: response?.data?.popularEvents,
                recommendedEvents: response?.data?.recommendedEvents,
                latestEvents:response?.data?.latestEvents,
            },
        });
    } catch (error) {
        dispatch({
            type: homeAndRecomConstants.GET_FAILURE,
            payload: { message: error?.response?.data?.message || "Server error", error: error.status },
        });
    }
};

export const fetchLatestSales = () => async (dispatch) => {
    dispatch({ type: homeAndRecomConstants.GET_LATEST_SALES_REQUEST });

    try {
        const response = await axios.get('/event-order/event-ticket-purchase-user');
      console.log(response,'ls');
      
        dispatch({
            type: homeAndRecomConstants.GET_LATEST_SALES_SUCCESS,
            payload: {
                latestSales:response?.data?.result,
            },
        });
    } catch (error) {
        dispatch({
            type: homeAndRecomConstants.GET_LATEST_SALES_FAILURE,
            payload: { message: error?.response?.data?.message || "Server error", error: error.status },
        });
    }
};