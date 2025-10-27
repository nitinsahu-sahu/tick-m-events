import axios from "../../../helper/axios";
import { reservationContractsConstants } from "../../constants";

// Organizer see project bids only
export const getReservationContracts = () => async (dispatch) => {
  dispatch({ type: reservationContractsConstants.GET_REQUEST });
  try {
    const response = await axios.get(`/p/reservation-contracts`);
    dispatch({
      type: reservationContractsConstants.GET_SUCCESS,
      payload: {
        message: response?.data?.message,
        project: response?.data?.contracts,
      },
    });
  } catch (error) {
    dispatch({
      type: reservationContractsConstants.GET_FAILURE,
      payload: { message: error?.response?.data?.message || "Server error", error: error.status },
    });
  }
};
