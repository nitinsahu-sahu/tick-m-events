import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';


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
    name: string;
    quantity: string;
    ticketDescription: string;
    price: string;
    validity: string;
    options: {
        transferableTicket: boolean;
        personalizedTicket: boolean;
        activationCode: boolean;
    };
}


// Create ticket type api implementaion
export const createTicketType = (
    ticketTypeCreate: TicketFormData
): AppThunk<Promise<ApiResponse>> => async (dispatch) => {

    dispatch({ type: ticketTypeConstants.CREATE_TICKET_TYPE_REQUEST });

    try {
        const response = await axios.post("/tickets", ticketTypeCreate);
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

export const fetchTicketType = (): AppThunk<Promise<ApiResponse>> => async (dispatch) => {
    dispatch({ type: ticketTypeConstants.GET_REQUEST });

    try {
        const response = await axios.get(`/tickets`);
        const successResponse: ApiResponse = {
            status: response.status,
            message: 'Success',
            data: response?.data?.data
        };
        
        dispatch({
            type: ticketTypeConstants.GET_SUCCESS,
            payload: successResponse,
        });
        
        return successResponse;

    } catch (error: any) {
        const errorResponse: ApiResponse = {
            status: error?.response?.status || 500,
            message: error?.response?.data?.message || "Server error",
            data: null
        };

        dispatch({
            type: ticketTypeConstants.GET_FAILURE,
            payload: errorResponse,
        });

        return errorResponse;
    }
};

export const updateTicketType = ({editedData}:any): AppThunk<Promise<ApiResponse>> => async (dispatch) => {
    dispatch({ type: ticketTypeConstants.UPDATE_REQUEST });

    try {
        const response = await axios.patch(`/tickets/${editedData._id}`,editedData);
        const successResponse: ApiResponse = {
            status: response.status,
            message: response.data.message,
        };
        
        dispatch({
            type: ticketTypeConstants.UPDATE_SUCCESS,
            payload: successResponse,
        });
        dispatch(fetchTicketType())
        return successResponse;

    } catch (error: any) {
        const errorResponse: ApiResponse = {
            status: error?.response?.status || 500,
            message: error?.response?.data?.message || "Server error",
        };

        dispatch({
            type: ticketTypeConstants.UPDATE_FAILURE,
            payload: errorResponse,
        });

        return errorResponse;
    }
};