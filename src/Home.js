import React from "react";
import "./Home.css";
import Product from "./Product"

function Home() {
  return (
    <div className="home-container">
      <div className="home">
        <img
          className="home-img"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt=""
        />

       <div className="home-row">
            <Product title="Microsoft - Xbox One S 1TB All-Digital Edition Console with Xbox One Wireless Controller"
                     image="https://m.media-amazon.com/images/I/51VQXsQ9P6L._AC_UY218_.jpg"
                     price={450.11} rating={5} id="9749823749"
            />
            <Product title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"
                      image="https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg"
                      price={1250} rating={4} id="9749856554"
            />
         
       </div>
       <div className="home-row">
            <Product title="Samsung Galaxy Watch Active 3 (Bluetooth, 44 mm)"
                     image="https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg"
                     price={550.23} rating={3} id="4849856554"
            />
            <Product title="Amazon Echo (3rd generation) | Smart speaker with Alexa"
                     image="https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$"
                     price={411} rating={4} id="5849756554"
            />
            <Product title="Meneflix Foldable Drone with Dual Camera HD Wide"
                     image="https://m.media-amazon.com/images/I/51207OF5nhL._AC_UL320_.jpg"
                     price={370.2} rating={4} id="5819756554"
            />
       </div>
       <div className="home-row">
            <Product title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440"
                     image="https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg"
                     price={411} rating={5} id="5819555554"
            />
       </div>

      </div>
    </div>
  );
}

export default Home;
