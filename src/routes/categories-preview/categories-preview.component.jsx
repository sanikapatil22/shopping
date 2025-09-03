import { useContext } from "react";
import { CategoriesContext } from "../../components/contexts/categories.context";
import CategoryPreview from "../../components/category-preview/category-preview.component";


const CategoriesPreview = () =>{
    const {categoriesMap} = useContext(CategoriesContext);
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