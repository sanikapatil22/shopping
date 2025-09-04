import {compose,  createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

const middleWares = [logger];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);







































// So the first library that I want to add is the Redux library.

// So this allows us to interact with the reducers that produce the root reducer which produce the store.

// Then there is React Redux, which gives us all the React bindings so that we can dispatch and pull these