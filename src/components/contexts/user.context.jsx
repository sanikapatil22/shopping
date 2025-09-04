import { createContext, useReducer, useEffect } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import { createAction } from "../../utils/reducers/reducers.util";
import { type } from "@testing-library/user-event/dist/type";

// Create a context with default values
export const UserContext = createContext({
    currentUser: null,              // no user at start
    setCurrentUser: () => null,     // placeholder function
});

// Define action types to avoid typos
export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
};

// Reducer function - decides how to update state
const userReducer = (state, action) => {
    // console.log('dispatched');
    // console.log(action);

    const { type, payload } = action; // extract type & data from action

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,            // spread existing state
                currentUser: payload // update only currentUser
            };
        default:
            throw new Error(`Unhandled type ${type} in userReducer`); // safety check
    }
}

// Initial state before any actions
const INITIAL_STATE = {
    currentUser: null,
};

// Provider component to wrap the app
export const UserProvider = ({ children }) => {
    // useReducer returns [state, dispatch function]
    const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);
    console.log(currentUser); // for debugging (logs whenever user changes)

    // Helper function to dispatch action
    const setCurrentUser = (user) => {
        dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
    };

    // Value to be passed down via context
    const value = { currentUser, setCurrentUser };

    // Run only once on mount (empty dependency array)
    useEffect(() => {
        // Firebase auth listener (login/logout detection)
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user); // create user in DB if not exists
            }
            setCurrentUser(user); // update context state
        });

        return unsubscribe; // clean up listener on unmount
    }, []);

    // Make the context available to children
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

// Notes:
// - useReducer centralizes state management logic
// - dispatch(action) -> reducer -> new state -> re-render
// - Context allows any child component to access currentUser without prop drilling
// How dispatch works here:
// 1. Something happens (e.g., user logs in).
// 2. setCurrentUser(user) is called.
// 3. That calls dispatch({ type: "SET_CURRENT_USER", payload: user }).
// 4. dispatch sends the action to userReducer.
// 5. userReducer updates state.currentUser with payload.
// 6. React re-renders components that use UserContext.