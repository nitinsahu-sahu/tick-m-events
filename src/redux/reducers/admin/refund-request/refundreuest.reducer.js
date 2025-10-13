import { refundReqConstants } from "src/redux/actions/constants";

const initialState = {
  loading: false,
  refundReqs: [],
  error: null,
  pagination: {}, 
};

const reqAndRefundsReducer = (state, action) => {
  if (state === undefined) {
    state = initialState; // Assign initial state here
  }

  switch (action.type) {
    case refundReqConstants.GET_RR_REQUEST:
      return { ...state, loading: true };

    case refundReqConstants.GET_RR_SUCCESS:
      return { ...state, loading: false, refundReqs: action.payload };

    case refundReqConstants.GET_RR_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state; // Always return a valid state
  }
};

export default reqAndRefundsReducer;

