import { serviceRequestConstants } from "./constants";
import axios from "../helper/axios";

// Event creating
// export const getRequestsByProvider = (request) => async (dispatch) => {
//     dispatch({ type: serviceRequestConstants.GET_REQUESTED_SERVICE_REQUEST });

//     try {
//         const response = await axios.get("/event-requests");
//         dispatch({
//             type: serviceRequestConstants.GET_REQUESTED_SERVICE_SUCCESS,
//             payload: {
//                 message: response?.data?.message,
//                 requests: response?.data?.requests
//             },
//         });
//     } catch (error) {
//         dispatch({
//             type: serviceRequestConstants.GET_REQUESTED_SERVICE_FAILURE,
//             payload: { message: error?.response?.data?.message || "Server error", error: error.status },
//         });
//     }
// };

export const getRequestsByProvider = (params) => async (dispatch) => {
    dispatch({ type: serviceRequestConstants.GET_REQUESTED_SERVICE_REQUEST });

    try {
        // Convert params object to query string
        const queryString = new URLSearchParams(params).toString();

        // Append query string to URL
        const response = await axios.get(`/event-requests?${queryString}`);

        dispatch({
            type: serviceRequestConstants.GET_REQUESTED_SERVICE_SUCCESS,
            payload: {
                message: response?.data?.message,
                requests: response?.data?.requests,
            },
        });
    } catch (error) {
        dispatch({
            type: serviceRequestConstants.GET_REQUESTED_SERVICE_FAILURE,
            payload: {
                message: error?.response?.data?.message || "Server error",
                error: error?.response?.status,
            },
        });
    }
};

// Event creating
export const organizerRequstToProvider = (formDataObj) => async (dispatch) => {
    dispatch({ type: serviceRequestConstants.ORGANIZER_SERVICE_TO_PROVIDER_REQUEST });

    try {
        const response = await axios.post("/event-requests", formDataObj);
        dispatch({
            type: serviceRequestConstants.ORGANIZER_SERVICE_TO_PROVIDER_SUCCESS,
            payload: {
                message: response?.data?.message
            },
        });
        return {
            type: serviceRequestConstants.ORGANIZER_SERVICE_TO_PROVIDER_SUCCESS,
            message: response?.data?.message,
            status: response?.status,
        };
    } catch (error) {
        dispatch({
            type: serviceRequestConstants.ORGANIZER_SERVICE_TO_PROVIDER_FAILURE,
            payload: { message: error?.response?.data?.message || "Server error", error: error.status },
        });
        return {
            type: serviceRequestConstants.ORGANIZER_SERVICE_TO_PROVIDER_FAILURE,
            message: error?.response?.data?.message,
            status: error?.status
        };
    }
};

// Provider sends proposal
export const sendProviderProposal = (eventRequestId, proposalData) => async (dispatch) => {
  dispatch({ type: serviceRequestConstants.SEND_PROVIDER_PROPOSAL_REQUEST });

  try {
   const response = await axios.post(`/event-requests/${eventRequestId}/propose`, proposalData);
    dispatch({
      type: serviceRequestConstants.SEND_PROVIDER_PROPOSAL_SUCCESS,
      payload: {
        message: response?.data?.message,
        updatedRequest: response?.data?.eventRequest
      },
    });

    return {
      type: serviceRequestConstants.SEND_PROVIDER_PROPOSAL_SUCCESS,
      message: response?.data?.message,
      status: response?.status,
    };
  } catch (error) {
    dispatch({
      type: serviceRequestConstants.SEND_PROVIDER_PROPOSAL_FAILURE,
      payload: {
        message: error?.response?.data?.message || "Server error",
        error: error.status
      },
    });

    return {
      type: serviceRequestConstants.SEND_PROVIDER_PROPOSAL_FAILURE,
      message: error?.response?.data?.message,
      status: error?.status
    };
  }
};

// get proposal
export const getProposalById = (eventRequestId) => async (dispatch) => {
  dispatch({ type: serviceRequestConstants.GET_PROPOSAL_BY_ID_REQUEST });

  try {
    const response = await axios.get(`/event-requests/${eventRequestId}/getPraposal`);

    dispatch({
      type: serviceRequestConstants.GET_PROPOSAL_BY_ID_SUCCESS,
      payload: response.data,
    });

    return {
      type: serviceRequestConstants.GET_PROPOSAL_BY_ID_SUCCESS,
      data: response.data,
    };
  } catch (error) {
    dispatch({
      type: serviceRequestConstants.GET_PROPOSAL_BY_ID_FAILURE,
      payload: {
        message: error?.response?.data?.message || "Server error",
        error: error?.status,
      },
    });

    return {
      type: serviceRequestConstants.GET_PROPOSAL_BY_ID_FAILURE,
      message: error?.response?.data?.message || "Server error",
      error: error?.status,
    };
  }
};

// update
export const updateProviderProposal = (eventRequestId, proposalData) => async (dispatch) => {
  dispatch({ type: serviceRequestConstants.UPDATE_PROVIDER_PROPOSAL_REQUEST });

  try {
    const response = await axios.patch(`/event-requests/${eventRequestId}/proposal`, proposalData);

    dispatch({
      type: serviceRequestConstants.UPDATE_PROVIDER_PROPOSAL_SUCCESS,
      payload: response.data,
    });

    return {
      type: serviceRequestConstants.UPDATE_PROVIDER_PROPOSAL_SUCCESS,
      data: response.data,
    };
  } catch (error) {
    dispatch({
      type: serviceRequestConstants.UPDATE_PROVIDER_PROPOSAL_FAILURE,
      payload: {
        message: error?.response?.data?.message || "Server error",
        error: error?.status,
      },
    });

    return {
      type: serviceRequestConstants.UPDATE_PROVIDER_PROPOSAL_FAILURE,
      message: error?.response?.data?.message || "Server error",
      error: error?.status,
    };
  }
};

// get orgainzer request
export const getRequestsByOrganizer = () => async (dispatch) => {
  try {
    dispatch({ type: serviceRequestConstants.GET_ORGANIZER_REQUESTS_REQUEST });
 
    const { data } = await axios.get(`/event-requests/organizer-requests`);
 
    dispatch({
      type: serviceRequestConstants.GET_ORGANIZER_REQUESTS_SUCCESS,
      payload: {
        requests: data.requests,
        total: data.total,
        currentPage: data.currentPage,
      },
    });
  } catch (error) {
    dispatch({
      type: serviceRequestConstants.GET_ORGANIZER_REQUESTS_FAILURE,
      payload: { message: error?.response?.data?.message || "Failed to fetch organizer requests" },
    });
  }
};

export const updateOrganizerDecision = (id, status, contractStatus) => async (dispatch) => {
  dispatch({ type: serviceRequestConstants.UPDATE_ORGANIZER_DECISION_REQUEST });
  try {
    const res = await axios.put(`/event-requests/${id}/status`, {
      status,
      contractStatus,
    });
 
    dispatch({
      type: serviceRequestConstants.UPDATE_ORGANIZER_DECISION_SUCCESS,
      payload: {
        message: res.data.message,
        updatedRequest: res.data.data,
      },
    });
  } catch (error) {
    dispatch({
      type: serviceRequestConstants.UPDATE_ORGANIZER_DECISION_FAILURE,
      payload: {
        message: error.response?.data?.message || 'Something went wrong',
      },
    });
  }
};
