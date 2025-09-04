import { createContext, useReducer } from "react";

const addItemToCart = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    // return a new array with updated quantity
    return cartItems.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter(
      (cartItem) => cartItem.id !== cartItemToRemove.id
    );
  }

  // return a new array with updated quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemsToCart: () => {},
  removeItemToCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const userReducer = (state, action) => {
  // The reducer (userReducer) receives this action and updates the state with the new values.
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS: // action
      return {
        ...state, // copy all the existing properties of the old state into the new object
        ...payload, // overwrite cartItems, cartCount, and cartTotal
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN: // action
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

export const CartProvider = ({ children }) => {
  const [{ isCartOpen, cartItems, cartCount, cartTotal }, dispatch] =
    useReducer(userReducer, INITIAL_STATE);

  // helper to update reducer with recalculated values
  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );

    dispatch({
      type: CART_ACTION_TYPES.SET_CART_ITEMS,
      payload: {
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotal: newCartTotal,
      },
    });
  };

  // actions
  const addItemsToCart = (productToAdd) => {
    const newCartItems = addItemToCart(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemToCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = (bool) => {
    dispatch({ type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: bool });
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemsToCart,
    cartItems,
    cartCount,
    removeItemToCart,
    clearItemFromCart,
    cartTotal,
  };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
};



	// 1.	First, take the product the user wants to add.
	// 2.	Pass it into addCartItem inside addItemToCart.
	// 3.	addCartItem checks if it already exists in cartItems:
	// •	If yes → increase its quantity.
	// •	If no → add it as a new item.
	// 4.	This gives a new newCartItems object/array (the updated cart).
	// 5.	Pass newCartItems into updateCartItemsReducer.
	// 6.	Inside it, recalculate:
	// •	newCartCount → total quantity of all items.
	// •	newCartTotal → total price of all items.
	// 7.	Then call dispatch with action type "SET_CART_ITEMS", sending newCartItems, newCartCount, and newCartTotal as the payload.
	// 8.	The reducer (cartReducer) receives this action and updates the state with the new values.
	// 9.	React re-renders → the UI shows the updated cart, count, and total.







//   🟢 Why do we update the state even if we already made a new object?

// When you create a new object (like newCartItems), it’s just a local variable inside your function.
// 	•	React doesn’t know about it.
// 	•	Your components won’t automatically re-render just because you made a new variable.

// 👉 React only re-renders when state (or context) changes.
// That’s why we must call dispatch (or setState) to tell React:
// “Hey, I have a new value for this state — please re-render the UI with it.”







// Why we don’t just mutate the old object (e.g., cartItems.push(product))
// 	1.	React state is immutable
// 	•	Immutability = we don’t directly change the existing object/array.
// 	•	Instead, we create a new copy with the changes.
	

//   2.	React uses shallow comparison
// 	•	React checks if the reference of state changed.
// 	•	If you mutate the old array → the reference stays the same → React thinks “no change” → ❌ no re-render.
// 	•	If you create a new array → the reference changes → React knows “something changed” → ✅ re-render.
// 	3.	Predictability
// 	•	Immutable updates make your reducer logic easy to track and debug.
// 	•	You always know the old state wasn’t modified; you only deal with the new one.
// 	4.	Performance (time-travel/debugging)
// 	•	In tools like Redux DevTools, immutability lets you “time travel” between states because every state is a clean snapshot, not a modified object.








// Why immutability doesn’t really waste memory
// 	1.	JS engines are optimized
// 	•	Modern JS engines (like V8 in Chrome) handle short-lived objects very efficiently.
// 	•	Old objects get garbage-collected (freed) quickly when no longer used.
// 	•	So when you make newCartItems, the old cartItems is removed from memory once nothing references it.
// 	2.	Small relative size
// 	•	For a shopping cart or app state, arrays are usually small (a few items, not millions).
// 	•	Copying a 10-item array to a new array is very cheap.
// 	3.	Shallow copies, not deep
// 	•	When you do [...cartItems], you’re only copying the references, not cloning entire objects deeply.
// 	•	So if you have 10 cart items, you’re just making a new array that points to the same 10 item objects.






// import { createContext, useReducer } from "react";

// const addItemToCart = (cartItems, productToAdd) => {
//   const existingCartItem = cartItems.find(
//     (cartItem) => cartItem.id === productToAdd.id
//   );

//   if (existingCartItem) {
//     // return a new array with updated quantity
//     return cartItems.map((item) =>
//       item.id === productToAdd.id
//         ? { ...item, quantity: item.quantity + 1 }
//         : item
//     );
//   }

//   return [...cartItems, { ...productToAdd, quantity: 1 }];
// };

// const removeCartItem = (cartItems, cartItemToRemove) => {
//   const existingCartItem = cartItems.find(
//     (cartItem) => cartItem.id === cartItemToRemove.id
//   );

//   if (existingCartItem.quantity === 1) {
//     return cartItems.filter(
//       (cartItem) => cartItem.id !== cartItemToRemove.id
//     );
//   }

//   // return a new array with updated quantity
//   return cartItems.map((cartItem) =>
//     cartItem.id === cartItemToRemove.id
//       ? { ...cartItem, quantity: cartItem.quantity - 1 }
//       : cartItem
//   );
// };

// const clearCartItem = (cartItems, cartItemToClear) => {
//   return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
// };

// export const CartContext = createContext({
//   isCartOpen: false,
//   setIsCartOpen: () => {},
//   cartItems: [],
//   addItemsToCart: () => {},
//   removeItemToCart: () => {},
//   clearItemFromCart: () => {},
//   cartCount: 0,
//   cartTotal: 0,
// });

// const CART_ACTION_TYPES = {
//   SET_CART_ITEMS: "SET_CART_ITEMS",
//   SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
// };

// const INITIAL_STATE = {
//   isCartOpen: false,
//   cartItems: [],
//   cartCount: 0,
//   cartTotal: 0,
// };

// const cartReducer = (state, action) => {
//   // The reducer (cartReducer) receives this action and updates the state with the new values.
//   const { type, payload } = action;
//   switch (type) {
//     case CART_ACTION_TYPES.SET_CART_ITEMS: // action
//       return {
//         ...state, // copy all the existing properties of the old state into the new object
//         ...payload, // overwrite cartItems, cartCount, and cartTotal
//       };
//     case CART_ACTION_TYPES.SET_IS_CART_OPEN: // action
//       return {
//         ...state,
//         isCartOpen: payload,
//       };
//     default:
//       throw new Error(`Unhandled type ${type} in cartReducer`);
//   }
// };

// export const CartProvider = ({ children }) => {
//   const [{ isCartOpen, cartItems, cartCount, cartTotal }, dispatch] =
//     useReducer(cartReducer, INITIAL_STATE);

//   // helper to update reducer with recalculated values
//   const updateCartItemsReducer = (newCartItems) => {
//     const newCartCount = newCartItems.reduce(
//       (total, cartItem) => total + cartItem.quantity,
//       0
//     );

//     const newCartTotal = newCartItems.reduce(
//       (total, cartItem) => total + cartItem.quantity * cartItem.price,
//       0
//     );

//     dispatch({
//       type: CART_ACTION_TYPES.SET_CART_ITEMS,
//       payload: {
//         cartItems: newCartItems,
//         cartCount: newCartCount,
//         cartTotal: newCartTotal,
//       },
//     });
//   };

//   // actions
//   const addItemsToCart = (productToAdd) => {
//     const newCartItems = addItemToCart(cartItems, productToAdd);
//     updateCartItemsReducer(newCartItems);
//   };

//   const removeItemToCart = (cartItemToRemove) => {
//     const newCartItems = removeCartItem(cartItems, cartItemToRemove);
//     updateCartItemsReducer(newCartItems);
//   };

//   const clearItemFromCart = (cartItemToClear) => {
//     const newCartItems = clearCartItem(cartItems, cartItemToClear);
//     updateCartItemsReducer(newCartItems);
//   };

//   const setIsCartOpen = (bool) => {
//     dispatch({ type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: bool });
//   };

//   const value = {
//     isCartOpen,
//     setIsCartOpen,
//     addItemsToCart,
//     cartItems,
//     cartCount,
//     removeItemToCart,
//     clearItemFromCart,
//     cartTotal,
//   };

//   return (
//     <CartContext.Provider value={value}>{children}</CartContext.Provider>
//   );
// };

