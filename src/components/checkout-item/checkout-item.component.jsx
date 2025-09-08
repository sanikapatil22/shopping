import './checkout-item.styles.scss';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems } from '../../store-for-redux/cart/cart.selector';
import { selectCartTotal } from '../../store-for-redux/cart/cart.selector';
import { addItemsToCart, clearItemFromCart, removeItemFromCart } from '../../store-for-redux/cart/cart.action';
const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const dispatch = useDispatch();

  const cartTotal = useSelector(selectCartTotal);
  const cartItems = useSelector(selectCartItems);


  const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem));
  const addItemHandler = () => dispatch(addItemsToCart(cartItems, cartItem));
  const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));

  return (
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>

        <div className='arrow' onClick={removeItemHandler}>&#10094;</div>
        {quantity}
        <div className='arrow' onClick={addItemHandler}>&#10095;</div>

        </span>

      <span className='price'>{price}</span>
      <div className='remove-button' onClick={clearItemHandler}>&#10005;</div>
    </div>
  );
};

export default CheckoutItem;