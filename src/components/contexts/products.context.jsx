import { createContext, useState, useEffect, use } from "react";
import SHOP_DATA from '../../shop-data.js';
import { addCollectionAndDocuments } from "../../utils/firebase/firebase.utils.jsx";
export const ProductsContext = createContext({
    products: [],
});

export const ProductsProvider = ({children}) => {
    const [products, setProduct] = useState([]);
    const value = {products};

    return (
        <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider> 
    );
};