import { useContext } from "react";
import { selectCategoriesMap } from "../../store-for-redux/categories/category.selector";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import { useSelector } from "react-redux";


const CategoriesPreview = () =>{
    const categoriesMap = useSelector(selectCategoriesMap);
    return (
        <> {
        Object.keys(categoriesMap).map(title =>{ //array of string where it contains "hats" "jackets"   key values & mapping through each key values
           const products = categoriesMap[title];
           return <CategoryPreview key={title} title={title} products={products} />
})
        }

        </>
    );
};

export default CategoriesPreview;