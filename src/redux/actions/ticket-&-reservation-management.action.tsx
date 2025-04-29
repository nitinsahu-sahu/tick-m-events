import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

// import { TicketFormData } from 'src/sections/ticket-and-reservation-management/ticket-creation-&-onfiguration';

import axios from "../helper/axios";
import { RootState } from "../store";

import { ticketTypeConstants } from "./constants";

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

interface ApiResponse {
  status: number;
  message: string;
  data?: any;
}
interface TicketFormData {
    eventName: string;
    availableQuantity: number;
    ticketDescription: string;
    price: number;
    validity: string;
    options: {
        transferableTicket: boolean;
        personalizedTicket: boolean;
        activationCode: boolean;
    };
}


// Create ticket type api implementaion
export const createTicketType = (
    data: TicketFormData
  ): AppThunk<Promise<ApiResponse>> => async (dispatch) => {

    dispatch({ type: ticketTypeConstants.CREATE_TICKET_TYPE_REQUEST });

    try {
        const response = await axios.post("/tickets/create-ticket", data);

        dispatch({
            type: ticketTypeConstants.CREATE_TICKET_TYPE_SUCCESS,
            payload: { message: response?.data?.message },
        });

        return {
            type: ticketTypeConstants.CREATE_TICKET_TYPE_SUCCESS,
            status: response.status,
            message: response?.data?.message
        };

    } catch (error) {
        dispatch({
            type: ticketTypeConstants.CREATE_TICKET_TYPE_FAILURE,
            payload: { message: error?.response?.data?.message || "Server error", error: error.status },
        });

        return {
            type: ticketTypeConstants.CREATE_TICKET_TYPE_FAILURE,
            message: error?.response?.data?.message || "Server error",
            status: error.status
        };
    }
};