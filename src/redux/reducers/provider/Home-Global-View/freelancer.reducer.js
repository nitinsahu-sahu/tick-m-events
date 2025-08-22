import { placeABidConstants,providerProposalConstants } from "src/redux/actions/constants";

const initialState = {
    loading: false,
    _projects: [],
    _mybids: [],
    _project: {},
    error: null,
    message:""
};

const placeABidReducer = (state, action) => {
    if (state === undefined) {
        state = initialState; // Assign initial state here
    }

    switch (action.type) {
        case providerProposalConstants.GET_MYBIDS_REQUEST:
            return { ...state, loading: true };

        case providerProposalConstants.GET_MYBIDS_SUCCESS:
            return {
                ...state,
                loading: false,
                _mybids: action.payload.mybids,
                message: action.payload.message
            };

        case providerProposalConstants.GET_MYBIDS_FAILURE:
            return { ...state, loading: false, error: action.payload };


        case placeABidConstants.GET_PROJECTBYID_REQUEST:
            return { ...state, loading: true };

        case placeABidConstants.GET_PROJECTBYID_SUCCESS:
            return {
                ...state,
                loading: false,
                _project: action.payload.project,
                message: action.payload.message
            };

        case placeABidConstants.GET_PROJECTBYID_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case placeABidConstants.GET_REQ_REQUEST:
            return { ...state, loading: true };

        case placeABidConstants.GET_REQ_SUCCESS:
            return {
                ...state,
                loading: false,
                _projects: action.payload.projects,
                message: action.payload.message
            };

        case placeABidConstants.GET_REQ_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state; // Always return a valid state
    }
};

export default placeABidReducer;

