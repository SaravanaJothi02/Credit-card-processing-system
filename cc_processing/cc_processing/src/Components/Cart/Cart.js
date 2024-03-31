import React,{useState, useEffect} from 'react';
import {auth,firestore} from '../../Config/Config';
import { CartProducts } from './CartProducts';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

import {useHistory} from 'react-router-dom'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();


export const Cart=()=>{
    const [cartProducts, setCartProducts]=useState([]);
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                firestore.collection('Cart ' + user.uid).onSnapshot(snapshot=>{
                    const newCartProduct = snapshot.docs.map((doc)=>({
                        ID: doc.id,
                        ...doc.data(),
                    }));
                    setCartProducts(newCartProduct);                    
                })
            }
            else{
                console.log('User is not signed in to retrieve cart');
            }
        })
    },[])

    let Product;
    
    // cart product increase function
    const cartProductIncrease=(cartProduct)=>{
        Product=cartProduct; 
        if(Product.qty<5){
        Product.qty=Product.qty+1;
        Product.TotalProductPrice=Product.qty*Product.price;
        }
        //Note this condition cart maximum space is 5
        /*else if(Product.qty>=5){
            console.log('cart limit is less than 5');
        }*/
        // update database
        auth.onAuthStateChanged(user=>{
            if(user){
                firestore.collection('Cart ' + user.uid).doc(cartProduct.ID).update(Product).then(()=>{
                    console.log('Increment added');
                })
            }
            else{
                console.log('User is not logged in to increment');
            }
        })
    }

    const cartProductDecrease =(cartProduct)=>{
        Product=cartProduct;
        if(Product.qty > 1){
            Product.qty=Product.qty-1;
            Product.TotalProductPrice=Product.qty*Product.price;
             // updating in database
            auth.onAuthStateChanged(user=>{
                if(user){
                    firestore.collection('Cart ' + user.uid).doc(cartProduct.ID).update(Product).then(()=>{
                        console.log('Decrement');
                    })
                }
                else{
                    console.log('User is not logged in to decrement');
                }
            })
        }
    }
     // getting the qty from cartProducts in a seperate array
    const qty = cartProducts.map(cartProduct=>{
        return cartProduct.qty;
    })
    const reducerOfQty = (accumulator, currentValue)=>accumulator+currentValue;

    const totalQty = qty.reduce(reducerOfQty,0);
    const price = cartProducts.map((cartProduct)=>{
        return cartProduct.TotalProductPrice;
    })

    // reducing the price in a single value
    const reducerOfPrice = (accumulator,currentValue)=>accumulator+currentValue;

    const totalPrice = price.reduce(reducerOfPrice,0);
   //changing payments
   const history = useHistory();
   const handleToken=async (token)=>{
    const cart={name:'Buy Products',totalPrice}
    const response=await axios.post('http://localhost:8080/checkout',{
        token,
        cart
    })
    console.log(response);
    let {status}=response.data;
    console.log(status);
    if(status==='success'){
        history.push('/');
        toast('Your order has been placed successfully!!!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
            const uid = auth.currentUser.uid;
            const carts = await firestore.collection('Cart ' + uid).get();
            for(var snap of carts.docs){
                firestore.collection('Cart ' + uid).doc(snap.id).delete();
            }
    }
        
   }

    return(
        <>
        {cartProducts.length > 0 && (
            <div className='container-fluid'>
                <h1 className='text-center'>Cart</h1>
                <div className='products-box'>
                    <CartProducts cartProducts={cartProducts}
                    cartProductIncrease={cartProductIncrease}
                    cartProductDecrease={cartProductDecrease}
                    />
                </div>
                 <div className='summary-box'>
                        <h5>Cart Summary</h5>
                        <br></br>
                        <div>
                        Total No of Products: <span>{totalQty}</span>
                        </div>
                        <div>
                        Total Price to Pay: <span>${totalPrice}</span>
                        </div>
                        <br></br>
                        <StripeCheckout
                            stripeKey='pk_test_51MOgUUE7AptuYyJDtgupdaLtuKEZk4bMprrCMP98pMexKt56FGcnk8AE2meADDwZfMsfVNmxN0qpXZxZCoz82MGO00pPItzkRA'
                            token={handleToken}
                            billingAddress
                            shippingAddress
                            name='All Products'
                            amount={totalPrice*100}
                           ></StripeCheckout>
                    </div>    
            </div>
        )}
        {cartProducts.length < 1 && (
            <div className='container-fluid'>No products to show</div>
        ) } 
        </>   
    )
}