import { placeABidConstants, providerProposalConstants, reservationContractsConstants, statisticsPerformanceConstants } from "src/redux/actions/constants";

const initialState = {
    loading: false,
    resarvationContracts: {},
    error: null,
    message: ""
};

const reservationContractsReducer = (state, action) => {
    if (state === undefined) {
        state = initialState; // Assign initial state here
    }

    switch (action.type) {
        case reservationContractsConstants.GET_REQUEST:
            return {
                ...state,
                loading: true
            };
        case reservationContractsConstants.GET_SUCCESS:
            return {
                ...state,
                message: action.payload.message,
                resarvationContracts: action.payload.project,
                loading: false
            };
        case reservationContractsConstants.GET_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                loading: true
            };

        default:
            return state; // Always return a valid state
    }
};

export default reservationContractsReducer;

