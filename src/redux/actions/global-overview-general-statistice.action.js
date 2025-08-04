import { globalOverviewStatisticsConstants } from "./constants";
import axios from "../helper/axios";

export const fetchMarketPlaceactivity = () => async (dispatch) => {
    dispatch({ type: globalOverviewStatisticsConstants.GET_MARKET_ACTIVITY_REQUEST });

    try {
        const response = await axios.get("/admin/gogs/pro-list");
        dispatch({
            type: globalOverviewStatisticsConstants.GET_MARKET_ACTIVITY_SUCCESS,
            payload: {
                providers: response?.data?.providers,
                message: response?.data?.message
            },
        });
    } catch (error) {
        dispatch({
            type: globalOverviewStatisticsConstants.GET_MARKET_ACTIVITY_FAILURE,
            payload: {
                message: error?.response?.data?.message || "Failed to fetch providers list",
                error: error.status
            },
        });
    }
};

export const fetchDashboardActivity = () => async (dispatch) => {
    dispatch({ type: globalOverviewStatisticsConstants.GET_DASHBOARD_ACTIVITY_REQUEST });

    try {
        const response = await axios.get("/admin/dashboard");
        dispatch({
            type: globalOverviewStatisticsConstants.GET_DASHBOARD_ACTIVITY_SUCCESS,
            payload: {
                dashboardData: response?.data?.dashboardData,
                message: response?.data?.message
            },
        });
    } catch (error) {
        dispatch({
            type: globalOverviewStatisticsConstants.GET_DASHBOARD_ACTIVITY_FAILURE,
            payload: {
                message: error?.response?.data?.message || "Failed to fetch providers list",
                error: error.status
            },
        });
    }
};