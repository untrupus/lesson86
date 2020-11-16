import {push} from "connected-react-router";
import {
    REGISTER_USER_FAILURE,
    REGISTER_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGIN_USER_SUCCESS,
    ADD_TRACK_FAILURE,
    FETCH_HISTORY_ERROR,
    FETCH_HISTORY_SUCCESS
} from "../actionTypes";
import axios from "../../axiosAPI";

const registerUserSuccess = () => {
    return {type: REGISTER_USER_SUCCESS};
};
const registerUserFailure = error => {
    return {type: REGISTER_USER_FAILURE, error};
};

export const registerUser = userData => {
    return async dispatch => {
        try {
            await axios.post("/users", userData);
            dispatch(registerUserSuccess());
            dispatch(push("/"));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(registerUserFailure(e.response.data));
            } else {
                dispatch(registerUserFailure(e));
            }
        }
    }
};

const loginUserSuccess = user => {
    return {type: LOGIN_USER_SUCCESS, user};
};
const loginUserFailure = error => {
    return {type: LOGIN_USER_FAILURE, error};
};

export const loginUser = userData => {
    return async dispatch => {
        try {
            const response = await axios.post("/users/sessions", userData);
            dispatch(loginUserSuccess(response.data));
            dispatch(push("/"));
        } catch (e) {
            dispatch(loginUserFailure(e.response.data));
        }
    }
};

const addTrackFailure = error => {
    return {type: ADD_TRACK_FAILURE, error};
};

export const addTrack = trackId => {
    return async (dispatch, getState) => {
        const headers = {
            "Authorization": getState().users.user && getState().users.user.user.token
        };
        try {
             await axios.post("/users/track_history", trackId, {headers})
        } catch (e) {
            dispatch(addTrackFailure(e));
        }
    }
};

const fetchHistorySuccess = data => {
    return {type: FETCH_HISTORY_SUCCESS, data};
};

const fetchHistoryError = error => {
    return {type: FETCH_HISTORY_ERROR, error};
};

export const fetchHistory = () => {
    return async (dispatch, getState) => {
        const headers = {
            "Authorization": getState().users.user && getState().users.user.user.token };
        try {
           const response = await axios("/users/track_history", {headers});
            console.log(response);
            dispatch(fetchHistorySuccess(response.data));

        } catch (e) {
            dispatch(fetchHistoryError(e));
        }
    }
};