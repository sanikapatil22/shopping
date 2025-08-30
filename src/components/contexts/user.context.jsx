import { createContext, useState } from "react";


//as the actual value u want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

//actual component
export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

//every context that gets built for us there is a .Provider which is a component that will wrap around any other component that need access to the values inside 
//provider---is allowing any of its child component to access the values
//inside of its use state
