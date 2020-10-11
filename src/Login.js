import React,{useState} from 'react'
import "./Login.css"
import {Link, useHistory} from "react-router-dom";
import { auth } from './firebase';

function Login() {
   const history = useHistory();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const signIn = (e) => {
      e.preventDefault();

      auth
          .signInWithEmailAndPassword(email, password)
          .then((auth) => {
              //  it succussfully created new user with email and password
            //   console.log(auth);  
              if(auth){
                 history.push('/');
              }
          })
          .catch(error => alert(error.message)) ; 
      // firebase login fancy stuffs........
   }
   const register = (e) => {
      e.preventDefault();

      auth
          .createUserWithEmailAndPassword(email, password)
          .then((auth) => {
              //  it succussfully created new user with email and password
            //   console.log(auth)  
              if(auth){
                 history.push('/');
              }
          })
          .catch(error => alert(error.message)) ;  //if any error,then it will display
      
      // firebase register fancy stuffs........
   }
    return (
       <div className="login">
          <Link to="/">
            <img className="login-logo" 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"/>
          </Link>
          
          <div className="login-cont">
             <h1>Sign In</h1>

             <form>
                 <h5>Email</h5>
                 <input type="text" value={email} onChange={e=> setEmail(e.target.value)}/>

                 <h5>Password</h5>
                 <input type="password" value={password} onChange={e=> setPassword(e.target.value)}/>

                 <button type="submit" onClick={signIn} className="login-signInBtn">Sign In</button>
              </form> 
               <p>
                   By signing-in you agree to Amazon clone's Conditions of Use & Sale. Please see
                   our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
               </p>

               <button  onClick={register} className="login-registerBtn">Create your Amazon clone account</button>
          </div>

       </div>
    )
}

export default Login
