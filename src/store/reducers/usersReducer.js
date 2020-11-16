import {
    REGISTER_USER_FAILURE,
    REGISTER_USER_SUCCESS,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    ADD_TRACK_FAILURE,
    FETCH_HISTORY_ERROR,
    FETCH_HISTORY_SUCCESS
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
        case ADD_TRACK_FAILURE:
            return {...state, addTrackError: action.error};
        case FETCH_HISTORY_ERROR:
            return {...state, historyError: action.error};
        case FETCH_HISTORY_SUCCESS:
            return {...state, trackHistory: action.data};
        default:
            return state;
    }
};

export default usersReducer;