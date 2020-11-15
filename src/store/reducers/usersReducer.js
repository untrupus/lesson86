import {REGISTER_USER_FAILURE} from "../actionTypes";

const initialState = {
    registerError: null
};

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case REGISTER_USER_FAILURE:
            return {...state, registerError: action.error};
        default:
            return state;
    }
};

export default usersReducer;