import { createSelector } from "reselect";

export const selectCategoryReducer = (state) => state.categories

export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => 
categories.reduce((acc, category) => {
        const {title, items} = category;
        acc[title.toLowerCase()] = items;
        return acc;
    }, {})
);









//createSelector-to avoid unwanted rerendering


//all this just to convert the array into a map so taht searching becomes easy
// Why it’s useful:
// 	•	Fast lookups:
// 	•	Array → O(n) (must loop each time).
// 	•	Map → O(1) (direct key access).
// 	•	Cleaner code:
// Instead of:categories.find(cat => cat.title === "Hats").items
// You can just do:
// categoriesMap["hats"]

// Your selector is taking the categories array from Redux state 
// and turning it into a map (object) where each key is the category title 
// (lowercased), and the value is the list of items in that category.

// state → the entire Redux store state.
// 	•	state.categories → the slice you created in categoriesReducer.
// 	•	state.categories.categoriesMap → the actual array/object of categories inside that slice


// types and reducer is for state updation and selector is for gettting the data