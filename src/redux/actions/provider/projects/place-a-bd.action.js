import { providerProposalConstants } from "../../constants";
import axios from "../../../helper/axios";

// Place a bid on a project
export const placeBid = (projectId,bidPayload) => async (dispatch) => {
  dispatch({ type: providerProposalConstants.POST_SENDPROPOSAL_REQUEST });
  try {
    const response = await axios.post(`/p/project/${projectId}/bids`,bidPayload);
    dispatch({
      type: providerProposalConstants.POST_SENDPROPOSAL_SUCCESS,
      payload: {
        message: response?.data?.message,
        project: response?.data?.project,
      },
    });
  } catch (error) {
    dispatch({
      type: providerProposalConstants.POST_SENDPROPOSAL_FAILURE,
      payload: { message: error?.response?.data?.message || "Server error", error: error.status },
    });
  }
};

// Organizer see project bids only
export const getProjectBids = (projectId) => async (dispatch) => {
  dispatch({ type: providerProposalConstants.GET_SENDPROPOSAL_REQUEST });
  try {
    const response = await axios.get(`/p/project/${projectId}/bids`);
    
    dispatch({
      type: providerProposalConstants.GET_SENDPROPOSAL_SUCCESS,
      payload: {
        message: response?.data?.message,
        project: response?.data?.project,
      },
    });
  } catch (error) {
    dispatch({
      type: providerProposalConstants.GET_SENDPROPOSAL_FAILURE,
      payload: { message: error?.response?.data?.message || "Server error", error: error.status },
    });
  }
};

// Provider see all bids only
export const getMyBids = () => async (dispatch) => {
  dispatch({ type: providerProposalConstants.GET_MYBIDS_REQUEST });
  try {
    const response = await axios.get(`/p/project/my-bids`);
    
    dispatch({
      type: providerProposalConstants.GET_MYBIDS_SUCCESS,
      payload: {
        message: response?.data?.message,
        mybids: response?.data?.mybids,
      },
    });
  } catch (error) {
    dispatch({
      type: providerProposalConstants.GET_MYBIDS_FAILURE,
      payload: { message: error?.response?.data?.message || "Server error", error: error.status },
    });
  }
};

// Provider see all bids only
export const withdrawnMyBids = (bidId) => async (dispatch) => {
  dispatch({ type: providerProposalConstants.DELETE_MYBID_REQUEST });
  try {
    const response = await axios.delete(`/p/project/${bidId}`);
    
    dispatch({
      type: providerProposalConstants.DELETE_MYBID_SUCCESS,
      payload: {
        message: response?.data?.message,
      },
    });
    dispatch(getMyBids())
  } catch (error) {
    dispatch({
      type: providerProposalConstants.DELETE_MYBID_FAILURE,
      payload: { message: error?.response?.data?.message || "Server error", error: error.status },
    });
  }
};

