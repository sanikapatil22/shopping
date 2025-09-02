import { useContext } from "react";
import { CategoriesContext } from "../../components/contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component";
import './shop.styles.scss';
const Shop = () =>{
    const {categoriesMap} = useContext(CategoriesContext);
    return (
        <>{
        Object.keys(categoriesMap).map(title =>( //array of string where it contains "hats" "jackets"   key values & mapping through each key values
            <> 
            <h2>{title}</h2>
                    <div className="products-container">
            {categoriesMap[title].map((product) => (
                <ProductCard key={product.id} product={product} />
            ))
            }
        </div>
            </>
        ))
        }

        </>
    )
}

export default Shop;