export const selectCategoriesMap = (state) => state.categories.categories
.reduce((acc, category) => {
        const {title, items} = category;
        acc[title.toLowerCase()] = items;
        return acc;
    }, {}
);

// Your selector is taking the categories array from Redux state 
// and turning it into a map (object) where each key is the category title 
// (lowercased), and the value is the list of items in that category.

// state → the entire Redux store state.
// 	•	state.categories → the slice you created in categoriesReducer.
// 	•	state.categories.categoriesMap → the actual array/object of categories inside that slice


// types and reducer is for state updation and selector is for gettting the data