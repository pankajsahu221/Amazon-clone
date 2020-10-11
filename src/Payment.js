import React, { useState, useEffect } from 'react'
import './Payment.css';
import CurrencyFormat from "react-currency-format";
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import {Link, useHistory} from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { getBasketTotal } from './reducer';
import axios from "./axios"
import { db } from './firebase';
import { v4 as uuidv4 } from 'uuid';  //it generates a random id


function Payment() {
    const history = useHistory();
    const [{basket, user}, dispatch ] = useStateValue();
    
    const stripe = useStripe();
    const elements = useElements(); 

    const [ processing, setProcessing ] = useState("");
    const [ succeeded, setSucceeded ] = useState(false);
    const [ error, setError ] = useState(null);
    const [ disabled, setDisabled ] = useState(true);
    const [ clientSecret, setClientSecret] = useState(true)

    //only need this stuff when using stripe payment method 
    // useEffect(()=>{
    //     //generate the special stripe secret which allows us to charge a customer

    //     const getClientSecret = async ()=>{
    //         const response = await axios({
    //             methods: "post",
    //             //  stripe expects the total in a currencies subunits
    //             // supposs dollar in cents 1$=100cents
    //              url: `/payments/create?total=${getBasketTotal(basket) * 100}`
    //         })
    //         setClientSecret(response.data.clientSecret);
    //     }

    //     getClientSecret();
    // },[basket])  // whenever the basket items changes, stripe changes the amount to charge the coustomer 

    // console.log("THIS IS CLIENT SECRET" , clientSecret)
    // console.log("this is the user",user)

    const handleSubmit = async(event)=>{
        //stripe stuffs goes here
        event.preventDefault();
        setProcessing(true);   //when we submit the buynow btn, it will be clicked only once

      /*  const payload = await stripe.confirmCardPayment(clientSecret, {   //confirming payment
              payment_method: {
                   card: elements.getElement(CardElement),
              },
            }).then(({ paymentIntent })=>{   //it will only run when payment request succussfully sent.
                //paymentIntent = payment confirmation
                
                //Here will be the data below
            } )  */

                // console.log("payment intent ",paymentIntent);

                 //current time in milliseconds
                let currTime = Math.round((new Date()).getTime() / 1000) ;
                //storing the order items into the firebase realtime database
                db
                  .collection('users')   //collection on users
                  .doc(user?.uid)        //go to the pertucular user who is ordering
                  .collection('orders')   //to the user's order
                  .doc( uuidv4() /*paymentIntent.id*/)   //create an order id
                  .set({                    //set the items and etc things in database
                      basket: basket,
                      amount: getBasketTotal(basket), //paymentIntent.amount,
                      created: currTime , //paymentIntent.created   //will give the time when order was created
                  })

                setSucceeded(true);
                setError(null);
                setProcessing(false);

                dispatch({
                    type: 'EMPTY_BASKET'
                })

                history.replace('/orders');  //we don't wanna come back to the payment page thatswhy used replace
            //here
         
         //here .then would have ended
    }
    
    const handleChange = (event)=>{
        // listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");

    }

    return (
       <div className="payment-container">
           <div className="payment"> 
             
             <h1>
                 Checkout (<Link to="/checkout">{basket?.length} items</Link>)
             </h1>
            

               <div className="payment-section">
                    <div className="payment-title">
                        <h3> Delivery Address </h3>
                    </div>

                    <div className="payment-address">
                        <p> {user?.email} </p>
                        <p> React Lane </p>
                        <p> Los Angeles, CA </p>
                    </div>
                    
               </div>

               <div className="payment-section">
                    <div className="payment-title">
                        <h3>Review items and delivery</h3>
                    </div>
                    
                    <div className="payment-items">
                        {basket.map(item => {
                         return <CheckoutProduct
                                key={uuidv4()}
                                id={item.id}
                                title={item.title}
                                price={item.price}
                                rating={item.rating}
                                image={item.image}        
                            />
                        })}
                    </div>
                    
               </div>

               <div className="payment-section">
                   <div className="payment-title">
                        <h3>Payment Method</h3>
                   </div>

                   <div className="payment-details">
                         {/* stripe payment magic will go */}
                         <form onSubmit={handleSubmit}>
                             <CardElement onChange={handleChange} className="card-element"/>

                             <div className="payment-priceContainer">
                                <CurrencyFormat
                                    renderText={(value)=>(
                                        
                                        <h3>Order Total: {value}</h3>
                                        
                                    )}
                                    decimalScale={2}   //after decimal(.) two no. will be there like 1.22
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}         className="buynow">
                                    <span>{processing? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                             </div>

                            {/* Errors */}
                            {error && <div>{error}</div>}
                            
                         </form>

                   </div>

               </div>
           </div>

       </div>
    )
}

export default Payment

