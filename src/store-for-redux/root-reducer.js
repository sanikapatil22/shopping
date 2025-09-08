// import { combineReducers } from "redux";
// import { userReducer } from "./user/user.reducer";
 import { categoriesReducer } from "./categories/category.reducer";
// import {cartReducer} from "./cart/cart.reducer"
// export const rootReducer = combineReducers({
//     user: userReducer,               //key: value
//     categories: categoriesReducer,
//     cart: cartReducer,
// })
import { combineReducers } from "redux";
import { cartReducer } from "./cart/cart.reducer";
import { userReducer } from "./user/user.reducer";

export const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  categories: categoriesReducer,
});