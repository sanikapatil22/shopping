import { useSelector } from 'react-redux';
import { Button } from '../button/button.component';
import { useNavigate } from 'react-router-dom';
import './cart-dropdown.scss';
import CartItem from '../cart-item/cart-item.component';
import { selectCartCount, selectCartItems } from '../../store-for-redux/cart/cart.selector';
const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout');
    }
    return(
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.map(item => (
                    <CartItem key={item.id} cartItem={item} />))}
            </div>
            <Button onClick = {goToCheckoutHandler} >GO TO CHECKOUT</Button>
        </div>
    )
}

export default CartDropdown;