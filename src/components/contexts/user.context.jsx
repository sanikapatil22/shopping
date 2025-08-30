import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener,createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

//as the actual value u want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

//actual component
export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};
    
    useEffect(()=> {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if(user){
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);  //signed in- stores obj,  out- null, both are correct
        })
         return unsubscribe //unsubscribe whebever u unmount
    }, []);
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

//every context that gets built for us there is a .Provider which is a component that will wrap around any other component that need access to the values inside 
//provider---is allowing any of its child component to access the values
//inside of its use state
