import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "./utils/firebase/firebase.utils";
import { createAction } from "./utils/reducers/reducers.util";
import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import {setCurrentUser} from "./store-for-redux/user.action";
import Checkout from "./routes/checkout/checkout.component";


const App= () => {
  const dispatch = useDispatch();
    useEffect(() => {
          const unsubscribe = onAuthStateChangedListener((user) => {
              if (user) {
                  createUserDocumentFromAuth(user); 
              }
              dispatch(setCurrentUser(user)); 
          });
          return unsubscribe; 
      }, );  //
  return (
    <>
      <Routes>

        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path='shop/*' element={<Shop />} />
          <Route path='auth' element={<Authentication />} />
          <Route path='checkout' element={<Checkout />} />
        </Route>

      </Routes>
    </>
  );
}

export default App;


	// The * is a wildcard in React Router (v6).
	// •	It tells the router: “This route may have nested child routes, so match anything that comes after /shop/ too.”
  // without *, This would only match exactly /shop.
	// •	Visiting /shop/hats or /shop/sneakers → ❌ would not work.






    // useEffect(() => {
    //       // Firebase auth listener (login/logout detection)
    //       const unsubscribe = onAuthStateChangedListener((user) => {
    //           if (user) {
    //               createUserDocumentFromAuth(user); // create user in DB if not exists
    //           }
    //           setCurrentUser(user); // update context state
    //       });
  
    //       return unsubscribe; // clean up listener on unmount
    //   }, []);