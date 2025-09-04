import { USER_ACTION_TYPES } from "./user.types";
const INITIAL_STATE = {
    currentUser: null,
};

// Reducer function - decides how to update state
export const userReducer = (state = INITIAL_STATE, action = {}) => {

    const { type, payload } = action; 

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,            
                currentUser: payload 
            };
        default:
            return state;
    }
}


// reducers in Redux

// receive every single action that gets dispatched ever.
//And also we need to, as a result, return the default state.
// Key thing actions pass to every single reducer.

// So that means that every single reducer by default needs to return the previous state if none of the

// cases match to the type.