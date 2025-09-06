import { Routes, Route } from 'react-router-dom';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { setCategories } from '../../store-for-redux/categories/category.action';
import './shop.styles.scss';

const Shop = () => {
    const dispatch = useDispatch();
     useEffect(() => {
            const getCategoriesMap = async () => {
                const categoriesArray = await getCategoriesAndDocuments('categories'); 
               
                dispatch(setCategories(categoriesArray));   //updating state with data from firebase
                   }
                   getCategoriesMap();  //	•	Then getCategoriesMap(); calls that async function, Without this call, the async function is just declared but never runs.
        },[])
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  );
};

export default Shop;


// Step by step:
// 	1.	Fetch from Firebase
//     const categoriesArray = await getCategoriesAndDocuments('categories');
//     This gives you the raw data (array of categories).
// 	2.	Update Redux store
//     dispatch(setCategories(categoriesArray));
//     	•	dispatch sends the action { type: "SET_CATEGORIES", payload: categoriesArray } to the reducer.
// 	•	The reducer updates the categories slice of the Redux store with this new data.

// 	3.	Other components can now read this state
// Components like CategoriesPreview or Category don’t need to fetch again — they just use useSelector to access the categories from Redux.