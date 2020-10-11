const functions = require('firebase-functions');
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")('sk_test_51HUVu5BlQOo2nKL9CHTc4GB8DSA7HNhAswobteqAwv7Sl1a2DoiBvIW0uslkZvc64deJ6xLFqU01E67kH6rbVfzQ00s31XGUGK');

// API

// API config
const app = express();

// Middlewares

app.use(cors({ origin:true }));
app.use( express.json() );   //allow to send and pass data in json format   
  
// API routes
app.get('/', (request, response) => response.status(200).send('hello world') );

app.post('/payments/create', async (request, response ) => {
    
     const total = request.query.total ; 

     console.log("Payment Request recieved for amount: ", total) ;

     const paymentIntent = await stripe.paymentIntents.create({
          amount: total,   //subunits of currency
          currency: 'usd',
          description: 'Software development services',
          shipping: {
              name: 'Jenny Rosen',
              address: {
              line1: '510 Townsend St',
              postal_code: '98140',
              city: 'San Francisco',
              state: 'CA',
              country: 'US',
              },
        },
        payment_method_types: ['card'],
     });

    //OK - created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })  

})

// Listen command
exports.api = functions.https.onRequest(app);