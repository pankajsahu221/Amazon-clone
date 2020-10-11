import React from 'react'
import "./Header.css";
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import {Link} from "react-router-dom";
import { useStateValue } from './StateProvider';
import { auth } from './firebase';

function Header() {
    const [{basket, user}, dispatch] = useStateValue();
    
    //if we clicked the signout btn and if there is a user already logged in then it will logout.  
    const handleAuthentication = ()=>{
        if(user)
            auth.signOut();
    }
    

    return (
      <div className="header-container">

      <div className="header">
       
       <Link to="/">
            <img className="header-logo" alt="amazon"
            src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"/>
       </Link>
        
        
        <div className="header-search">
            <input className="header-search-input" type="text"/>
            <SearchIcon className="header-search-icon"/>
        </div>
        
        <div className="header-nav">
          {/* if no user has logged in,then only we will enter login page otherwise it will logout */}
            <Link to={!user && "/login"}   
                  style={{ textDecoration: 'none'}}>
                <div onClick={handleAuthentication} className="header-option">
                    {/*we could also use {user?.email.replace("@gmail.com","") || "Guest"} */}
                    <span className="header-option-lineOne">Hello, {!user? "Guest": user?.email.replace("@gmail.com","")}</span>  
                    <span className="header-option-lineTwo">{user? "Sign out" : "Sign in" }</span>
                </div>
            </Link>
            
            <Link to="/orders" style={{ textDecoration: 'none' }}>
              <div className="header-option">
                  <span className="header-option-lineOne">Returns</span>
                  <span className="header-option-lineTwo">& Orders</span>
                  
              </div>
            </Link>

            <div className="header-option">
                <span className="header-option-lineOne">Your</span>
                <span className="header-option-lineTwo">Prime</span>
                
            </div>
            <div className="header-optionBasket">
                <Link to="/checkout">
                    <ShoppingBasketIcon className="basket-icon"/>
                </Link>
                <span className="header-option-lineTwo header-basketCount">{ basket?.length }</span>
            </div>
          </div>

        </div>
      {/* to move "search" to the next line when screen width is small  */}
        <div className="header-search-bottom">
            <input className="header-search-input-bottom" type="text"/>
            <SearchIcon className="header-search-icon-bottom"/>
        </div>
      </div>
    )
}

export default Header
