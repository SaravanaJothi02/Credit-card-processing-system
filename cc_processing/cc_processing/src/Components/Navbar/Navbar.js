import React,{useState} from 'react'
import {Link,useHistory,NavLink} from 'react-router-dom'
import cart from '../../images/cart.png'
import {Icon} from 'react-icons-kit'
import {shoppingCart} from 'react-icons-kit/feather/shoppingCart'
import {auth} from '../../Config/Config'
import './Navbar.css'


export const Navbar = ({user,totalProducts}) => {
    const [click, setClick] = useState(false);

    const history = useHistory();

    const handleLogout=()=>{
        auth.signOut().then(()=>{
            history.push('/login');
        })
    }

    return (
      <nav className="navbarr">
      <div className="nav-container">
        <NavLink exact to="/" className="nav-logo">
          eshopping
          <i class="fa-solid fa-cart-plus"></i>
        </NavLink>
        {!user&&<>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <NavLink exact to="/login" activeClassName="active" className="nav-links">Login</NavLink>
          </li>
          <li className="nav-item">
            <NavLink exact to="/signup" activeClassName="active" className="nav-links">Signup</NavLink>
          </li>
          <li className="nav-item">
            <NavLink exact to="/cart" activeClassName="active" className="nav-links"><i class="fa-solid fa-cart-shopping"></i></NavLink>
          </li>
        </ul>
       </>} 
      {user&&<>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <NavLink
              exact
              to="/"
              activeClassName="active"
              className="nav-links"
            >{user}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              to="/signup"
              activeClassName="active"
              className="nav-links"
              onClick={handleLogout}
            >Logout
            </NavLink>
          </li>
          <li className="nav-item">
          
            <NavLink exact to="/cart" activeClassName="active" className="nav-links"><i class="fa-solid fa-cart-shopping"></i> <span className='cart-indicator'>{totalProducts}</span></NavLink>
           
          </li>
        </ul>

        </>}    
        <div className="nav-icon">
          <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
      </div>
    </nav>
    
      
          
      
    )
}