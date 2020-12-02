import {
    REGISTER_USER_FAILURE,
    REGISTER_USER_SUCCESS,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    FETCH_HISTORY_ERROR,
    FETCH_HISTORY_SUCCESS,
    LOGOUT_USER
} from "../actionTypes";

const initialState = {
    registerError: null,
    loginError: null,
    user: null,
    addTrackError: null,
    historyError: null,
    trackHistory: []
};

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case REGISTER_USER_FAILURE:
            return {...state, registerError: action.error};
        case REGISTER_USER_SUCCESS:
            return {...state, registerError: null};
        case LOGIN_USER_FAILURE:
            return {...state, loginError: action.error};
        case LOGIN_USER_SUCCESS:
            return {...state, user: action.user, loginError: null};
        case FETCH_HISTORY_ERROR:
            return {...state, historyError: action.error};
        case FETCH_HISTORY_SUCCESS:
            return {...state, trackHistory: action.data};
        case LOGOUT_USER:
            return {...state, user: null};
        default:
            return state;
    }
};

export default usersReducer;