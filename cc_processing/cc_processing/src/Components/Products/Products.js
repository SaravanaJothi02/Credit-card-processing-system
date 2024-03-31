import React,{useState, useEffect} from 'react';
import {Productlist} from './Productlist';
import {auth,firestore} from '../../Config/Config';
import './Products.css';
import { toast } from 'react-toastify'
export const Products=(props)=>{
    /*const style = {
        color:'#fff',
    }*/
    const notify = (msg) => toast.success(msg);
    function GetUserUid(){
        const [uid, setUid]=useState(null);
        useEffect(()=>{
            auth.onAuthStateChanged(user=>{
                if(user){
                    setUid(user.uid);
                }
            })
        },[])
        return uid;
    }

const uid = GetUserUid();

// getting products function
const [products, setProducts]=useState([]);
const getProducts = async ()=>{
const products = await firestore.collection('Products').get();
const productsArray = [];
for (var snap of products.docs){
    var data = snap.data();
    data.ID = snap.id;
    productsArray.push({
        ...data
    })
    if(productsArray.length === products.docs.length){
        setProducts(productsArray);
    }
}
}
useEffect(()=>{
    getProducts();
},[])
 

 
let Product;
const addToCart = (product)=>{
    if(uid!==null){
        Product=product;
        Product['qty']=1;
        Product['TotalProductPrice']=Product.qty*Product.price;
        firestore.collection('Cart ' + uid).doc(product.ID).set(Product).then(()=>{
            /*const check = (product) => {
                firestore.collection('Cart'+uid).doc(product.ID).then(()=>{
                    
                })
            }
            if(product.ID===)*/
            notify("successfully added to the cart")
        })
        
    }
     else{
        props.history.push('/login');
    }
        
}
return(
<>
{products.length > 0 && (
<div className='container-fluid'>
    <h1 className='text-center'>Products</h1>
    <div className='products-box'>
        <Productlist products={products} addToCart={addToCart}/>
    </div>
</div>
)}
{products.length < 1 && (
<div className='container-fluid'>Please wait....</div>
)}
</>
)
}
export default Products;