import React from 'react'
import "./CheckoutProduct.css"
import { useStateValue } from './StateProvider';
import StarIcon from '@material-ui/icons/Star';
import { v4 as uuidv4 } from 'uuid';  //it generates a random id

function CheckoutProduct({id, image, title, price, rating, hidermvbtn}) {
    const [{basket}, dispatch] = useStateValue();

    const removeFromBasket = () => {
         dispatch({
             type : "REMOVE_FROM_BASKET",
             id : id,
         })
    }

    return (
        <div className="checkoutProduct">
           <img src={image} className="checkoutProduct-img"/>

           <div className="checkoutProduct-info">
               <h4 className="checkoutProduct-title">{title}</h4>
               <p className="checkoutProduct-price">
                    <small>$</small>
                    <strong>{price}</strong>  
                  </p>

                <div className="checkProduct-rating">
                    {Array(rating).fill().map((_,i )=>{
                       return <p key={uuidv4()}><StarIcon className="star" style={{fontSize: '20px'}}/></p>
                     })}
                </div>
                
                {!hidermvbtn &&  <button onClick={removeFromBasket}>Remove from Basket</button> }
               
           </div>
            
        </div>
    )
}

export default CheckoutProduct
