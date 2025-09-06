import { Fragment, useContext } from 'react';
import { Outlet,Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store-for-redux/user.selector';
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import './navigation.styles.scss';
import { CartContext } from '../../components/contexts/cart.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
const Navigation = () => {
   // const {currentUser} = useContext(UserContext);
    const currentUser = useSelector(selectCurrentUser);
    const {isCartOpen} = useContext(CartContext);
    // const signOutHandler = async() => {
    //     await signOutUser();
    //     setCurrentUser(null);
    // }
  return (
    <Fragment>
      <div className='navigation'>
        <Link className='logo-container' to='/'>
            <CrwnLogo />
        </Link>
        <div className='nav-links-container'>
          <Link className='nav-link' to='/'>Home</Link>
          <Link className='nav-link' to='/shop'>Shop</Link>
          {
            currentUser ? (
                <span className='nav-link' onClick={signOutUser}> Sign Out </span>
            ): (
                    <Link className='nav-link' to='/auth'>Sign In</Link>
                )
          }
          <CartIcon />
          
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;


