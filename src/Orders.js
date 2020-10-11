import React, { useState, useEffect } from 'react'
import "./Orders.css";
import { useStateValue } from './StateProvider';
import { db } from './firebase';
import Order from './Order';
import { v4 as uuidv4 } from 'uuid';  //it generates a random id

function Orders() {
    const [{basket, user}, dispatch ] = useStateValue();
    const [orders, setOrders] = useState([]);

    useEffect(()=>{
        if(user){

            //getting the data of orders form firebase realtime database
            db
              .collection('users')   //collection of users
              .doc(user?.uid)        //entering the perticular user
              .collection('orders')   //to the user's oders
              .orderBy('created', 'desc')   //arranging them in descending order of their created time
              .onSnapshot(snapshot => {
                  setOrders( snapshot.docs.map(doc => ({
                      id: doc.id,          //id of the order
                      data: doc.data(),    //whole data of the order
                  })))
              })
        }
        else{
            setOrders([]);
        }

    }, [user]) ;

    return (
       <div className="orders-container">
           <div className="orders">
              <h1>Your Orders</h1>

               <div className="orders-order">
                   {orders?.map(order => {
                   return <Order key={uuidv4() } order={order} />
                   })}
               </div>
           </div>
        </div>
    )
}

export default Orders
