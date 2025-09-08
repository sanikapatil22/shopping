import { useDispatch, useSelector } from 'react-redux';
import { selectCartCount, selectIsCartOpen } from '../../store-for-redux/cart/cart.selector';
import { setIsCartOpen } from '../../store-for-redux/cart/cart.action';
import './cart-icon.styles.scss';
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
// import { CartContext } from '../contexts/cart.context';
const CartIcon = () =>{
    // const {isCartOpen,setIsCartOpen, cartCount} = useContext(CartContext);

    const cartCount = useSelector(selectCartCount);
    const isCartOpen = useSelector(selectIsCartOpen);
    const dispatch = useDispatch();
    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));
    return (
        <div className='cart-icon-container' onClick={toggleIsCartOpen}>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'>{cartCount}</span>
        </div>
    )
}

export default CartIcon;
//for setting some value we dispatch and for getting we use selectors