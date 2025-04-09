import { authConstants } from "./constants";
import axios from "../helper/axios";

// Checking admin login or not
export const login = (data) => async (dispatch) => {
    const { email, password } = data;

    dispatch({ type: authConstants.LOGIN_REQUEST });

    try {
        const response = await axios.post("/auth/login", { email, password });
        const { token, user, message, expiresIn } = response.data;

        // Calculate expiration time (current time + expiresIn)
        const expirationTime = Date.now() + expiresIn;

        // Store token and expiration time in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("expiresAt", expirationTime.toString());

        // Set a timer to log the user out when the token expires
        const timeout = setTimeout(() => {
            dispatch(logout()); // Dispatch logout action when the token expires
        }, expiresIn);

        // Store the timeout ID in localStorage (to clear it on logout)
        localStorage.setItem("logoutTimer", timeout);

        // ✅ Dispatch success
        dispatch({
            type: authConstants.LOGIN_SUCCESS,
            payload: { token, user, message },
        });

        // ✅ Explicitly return the response data
        return {
            type: authConstants.LOGIN_SUCCESS,
            status: response.status,
            message: response?.data?.message
        };

    } catch (error) {
        // Dispatch failure
        dispatch({
            type: authConstants.LOGIN_FAILURE,
            payload: { message: error?.response?.data?.message || "Server error", error: error.status },
        });

        return {
            type: authConstants.LOGIN_FAILURE,
            message: error?.response?.data?.message || "Server error",
            status: error.status
        };
    }
};

// Logout action
export const logout = () => async (dispatch) => {
    dispatch({ type: authConstants.LOGOUT_REQUEST });

    try {
        await axios.post("/auth/logout"); // Call the backend logout API
    } catch (error) {
        console.error("Logout error:", error);
    }

    // Clear authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("expiresAt");

    // Clear the logout timer
    const timeout = localStorage.getItem("logoutTimer");
    if (timeout) {
        clearTimeout(Number(timeout));
        localStorage.removeItem("logoutTimer");
    }

    dispatch({ type: authConstants.LOGOUT_SUCCESS });
};

// User login or not
export const isUserLoggedIn = () => async (dispatch) => {
    const token = localStorage.getItem("token");
    const user = token ? JSON.parse(localStorage.getItem("user") || "{}") : null;

    dispatch({
        type: token ? authConstants.LOGIN_SUCCESS : authConstants.LOGIN_FAILURE,
        payload: token ? { token, user } : { message: "Failed to login!!!" },
    });
};
