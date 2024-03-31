import React from 'react';
import {IndividualProduct} from './IndividualProduct';
import './Products.css';

export const Productlist = ({products,addToCart}) => {

    // console.log(products);
    
    return products.map((individualProduct)=>(
        <IndividualProduct key = {individualProduct.ID} individualProduct={individualProduct}  addToCart={addToCart}/>
       
    ))
}