import React,{useState, useEffect} from'react';
import img1 from '../../images/img1.jpg';
import home from '../../images/home.jpg';
import img4 from '../../images/img4.jpg';
import img5 from '../../images/img5.jpg';
import {Navbar} from '../Navbar/Navbar';
import './Home.css';
import {Link} from 'react-router-dom';
import {auth,firestore} from '../../Config/Config'
export const Home=()=>{
    return(
        <div className="info">
        <div className="content">
          <div className="head">
            <h1>Ready for new stuff</h1>
            <p>Buy new stock at reasonable cost</p>
  
            <Link to="/products">
              <button>Get Started</button>
            </Link>
          </div>
        </div>
        <div className="pic"></div>
      </div>
    )
}
export default Home;