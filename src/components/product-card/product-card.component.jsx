import { useDispatch, useSelector } from 'react-redux';
import { addItemsToCart } from '../../store-for-redux/cart/cart.action';
import { selectCartItems } from '../../store-for-redux/cart/cart.selector';
import { Button } from '../button/button.component';

import './product-card.styles.scss';

const ProductCard = ({ product }) => {
    const { name, price, imageUrl } = product;
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const addProductToCart = () => dispatch(addItemsToCart(cartItems, product));
   
    return (
        <div className='product-card-container'>
            <img src={imageUrl} alt={`${name}`} />
            <div className='footer'>
                <span className='name'>{name} </span>
                <span className='price'> {price} </span>
            </div>
            <Button buttonType='inverted' onClick={addProductToCart}>Add to cart</Button>
        </div>
    );
};

export default ProductCard;