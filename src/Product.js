import React from 'react'
import "./Product.css";
import { useStateValue } from './StateProvider';
import StarIcon from '@material-ui/icons/Star';

function Product({id, title, image, price, rating}) {
    const [{basket} , dispatch] = useStateValue(); 

    //you can uncomment to see the items in the basket
    // console.log("this is basket",basket)

    const addToBasket = ()=>{
        // dispach the item into the data layer
        dispatch({
            type: "ADD_TO_BASKET",
            item: {
                id : id,
                title : title,
                image : image,
                price : price,
                rating : rating,
            },
        })
    }

    return (
        <div className="product">
             <div className="product-info">
                 <p>{title}</p>
                 <p className="product-price">
                    <small>$</small>
                    <strong>{price}</strong>
                 </p>
                 
                 <div className="product-rating">
                    {Array(rating).fill().map((_, i)=>{
                        return <p key={i}><StarIcon className="star" style={{fontSize: '15px'}}/></p>
                     })}
                 </div>
             </div>
             <img src={image} alt=""/>
             <button onClick={addToBasket}>Add to Basket</button>
        </div>
    )
}

export default Product
