import { globalOverviewStatisticsConstants } from "../actions/constants";

const initialState = {
    message: '',
    providers: [],
    dashboardData:{},
    loading: true,
    error: null
};

const globalOverviewGeneralStatisticsReducer = (state, action) => {
    if (state === undefined) {
        state = initialState; // Assign initial state here
    }
    switch (action.type) {
         case globalOverviewStatisticsConstants.GET_DASHBOARD_ACTIVITY_REQUEST:
            return { ...state, loading: true };

        case globalOverviewStatisticsConstants.GET_DASHBOARD_ACTIVITY_SUCCESS:
            return {
                ...state,
                dashboardData: action.payload.dashboardData,
                message: action.payload.message,
                loading: false
            };

        case globalOverviewStatisticsConstants.GET_DASHBOARD_ACTIVITY_FAILURE:
            return {
                ...state,
                error: action.payload.message,
                loading: true
            };
        case globalOverviewStatisticsConstants.GET_MARKET_ACTIVITY_REQUEST:
            return { ...state, loading: true };

        case globalOverviewStatisticsConstants.GET_MARKET_ACTIVITY_SUCCESS:
            return {
                ...state,
                providers: action.payload.providers,
                message: action.payload.message,
                loading: false
            };

        case globalOverviewStatisticsConstants.GET_MARKET_ACTIVITY_FAILURE:
            return {
                ...state,
                error: action.payload.message,
                loading: true
            };
        default:
            return state; // Always return a valid state
    }
};


export default globalOverviewGeneralStatisticsReducer;