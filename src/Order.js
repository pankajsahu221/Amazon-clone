import React from 'react'
import './Order.css';
import moment from 'moment';
import CheckoutProduct from './CheckoutProduct'; 
import CurrencyFormat from "react-currency-format";
import { v4 as uuidv4 } from 'uuid';  //it generates a random id

function Order({ order }) {
    return (
       <div className="order">
           <h2>Order</h2>
           <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
           
           <p className="order-id">
               <small>ID: {order.id}</small>
           </p>

           {order.data.basket?.map(item => {
               return <CheckoutProduct
                      key={uuidv4()}
                      id={item.id}
                      title={item.title}
                      price={item.price}
                      rating={item.rating}
                      image={item.image}  
                      hidermvbtn      
                    />
           })}
           <CurrencyFormat
               renderText={(value)=>(
                  <>
                    <h3 className="order-total">Order Total: {value} </h3>
                  </>
               )}
               decimalScale={2}   //after decimal(.) two no. will be there like 1.22
               value={ order.data.amount }
               displayType={"text"}
               thousandSeparator={true}
               prefix={"$"}
           />

       </div>

    )
}

export default Order
