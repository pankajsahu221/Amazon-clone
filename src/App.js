import React,{useEffect} from 'react';
// import './App.css';
import Header from "./Header";
import Home from "./Home";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Checkout from './Checkout';
import Login from './Login';
import Payment from './Payment';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import Orders from './Orders';

const promise = loadStripe("pk_test_51HUVu5BlQOo2nKL9aKLnsYYd1jfpz1hxGKG73vrY0EWoHrGNYK5tayMJ3onQkoUMfHHZJiRIPRsf1HsIkrZZvHR4006QsMpEH7");

function App(){
   const [{} , dispatch ] = useStateValue();

  useEffect(()=>{
      //will only runs once when the app component loads

      auth.onAuthStateChanged(authUser => {  //when the user changes
        // console.log("THE USER IS ", authUser) ;

        if(authUser){    //the user just logged in or the user was logged in 
            dispatch({
              type:'SET_USER',
              user: authUser,
            })

        }else{    //the user logged out
            dispatch({
              type:'SET_USER',
              user: null,
            })
        }

      })

  },[]);

   return (
     <Router>
        <div className="App">

          <Switch>

          <Route path="/orders">
                <Header/>
                <Orders/>
            </Route>

          <Route path="/checkout">
                <Header/>
                <Checkout/>
            </Route>

          <Route path="/Login">
                <Login/>
            </Route>

          <Route path="/payment">
                <Header/>
                <Elements stripe={promise}>
                    <Payment/>
                </Elements>
            </Route>

          <Route path="/">            
                <Header/>
                <Home/>
            </Route>

          </Switch>
            
        </div>
     </Router>
    );
}

export default App;