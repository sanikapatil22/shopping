// was products.context.jsx first
import { createContext, useState, useEffect, use } from "react";
import SHOP_DATA from '../../shop-data.js';
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils.jsx";


export const CategoriesContext = createContext({
    categoriesMap: {},    //{} empty obj as default value
});

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments(); 
           // console.log(categoryMap);
            setCategoriesMap(categoryMap);   //updating state with data from firebase
               }
               getCategoriesMap();
    },[])
    const value = {categoriesMap};

    return (
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider> 
    );
};

//useEffect coz
	// 	If you fetch data directly in the component body, it would run on every render → infinite loop risk.
	// 	Runs only once after the component mounts
	// 	The empty dependency array [] tells React: “Run this effect once when ProductsProvider is first rendered.”
	// 	Perfect for initial data loading.