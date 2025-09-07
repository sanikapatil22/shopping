import {compose,  createStore, applyMiddleware} from 'redux';
//import logger from 'redux-logger';
//import that logger insted of all this code
import { rootReducer } from './root-reducer';

const loggerMiddleware = (store) => (next) => (action) => {
    if(!action.type){
        return next(action);
    }

    console.log('type', action.type);
    console.log('payload', action.payload);
    console.log('current state:', store.getState());

    next(action);

    console.log('next state:', store.getState());   
};

const middleWares = [loggerMiddleware];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);








//dispatch(action) → store → rootReducer → each reducer checks action → update state slice → store holds new global state


//  1.	dispatch(setCurrentUser(user)) → Action object { type, payload } is created and sent to the store.
// 	2.	Store receives action → Forwards it to the root reducer.
// 	3.	Root reducer (combineReducers) → Sends the action to every slice reducer.
// 	4.	Each reducer checks action type → If matches, updates its state slice; else returns previous state.
// 	5.	userReducer handles SET_CURRENT_USER → Updates currentUser in its state slice.
// 	6.	Store updates global state → Combines updated slices from all reducers.
// 	7.	State is now accessible anywhere → Components can read via useSelector or connect.



























// So the first library that I want to add is the Redux library.

// So this allows us to interact with the reducers that produce the root reducer which produce the store.

// Then there is React Redux, which gives us all the React bindings so that we can dispatch and pull these