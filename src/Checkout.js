import React from 'react'
import "./Checkout.css"
import Subtotal from "./Subtotal";
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { v4 as uuidv4 } from 'uuid';  //it generates a random id

function Checkout() {
    const [{basket, user}, dispatch] = useStateValue();

    return (
       <div className="checkout-container">
          <div className="checkout"> 

            <div className="checkout-top">
               <img className="checkout-ad" alt=""
                   src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
               />

                   {/* for mob users */}
                   <div className="checkout-subtotal-mob">
                       <Subtotal/>
                   </div>
               <div>
                  <h3 className="username">Hello, {user?.email}</h3> {/*by using '?' it will not error if no user logged-in */}
                  <h2 className="checkout-title">Your shopping Basket</h2>

                {basket.map(item => {
                   return <CheckoutProduct
                        key= {uuidv4()}
                        id={item.id}
                        title={item.title}
                        price={item.price}
                        rating={item.rating}
                        image={item.image}        
                    />
                })}

               </div>
            </div>

             {/* for web users */}
             <div className="checkout-subtotal-web">
                    <Subtotal/>
             </div>


          </div>
       </div>
    )
}

export default Checkout
