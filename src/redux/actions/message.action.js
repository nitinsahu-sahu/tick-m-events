import axios from "../helper/axios";
import { messageConstants } from "./constants";

export const fetchMessagesbyConvId = (conversationId, receiver, _id) => async (dispatch) => {
    dispatch({ type: messageConstants.FETCH_MESSAGES_REQUEST });
    try {
        const response = await axios.get(`/conv/message/${conversationId}?senderId=${_id}&&receiverId=${receiver}`);
        dispatch({
            type: messageConstants.FETCH_MESSAGES_SUCCESS,
            payload: {
                userMessages: response.data,
                receiver,
                conversationId,
                message: "Get user successfully..."
            }
        });
    } catch (error) {
        dispatch({
            type: messageConstants.FETCH_MESSAGES_FAILURE,
            payload: { message: error?.response?.data?.message || "Server error", error: error.status },
        });
    }
};

export const deleteMsgEveryOne = (_id, isConvId) => async (dispatch) => {
    dispatch({ type: messageConstants.DELETE_MESSAGES_REQUEST });
    try {
        const response = await axios.delete(`/conv/message/delete/${_id}`);
        dispatch({
            type: messageConstants.DELETE_MESSAGES_SUCCESS,
            payload: {
                message: response.data.message
            }
        });
        dispatch(fetchMessagesbyConvId(isConvId.convId, isConvId.userData, isConvId._id))
    } catch (error) {
        dispatch({
            type: messageConstants.DELETE_MESSAGES_FAILURE,
            payload: { error: error.data.errors },
        });
    }
};