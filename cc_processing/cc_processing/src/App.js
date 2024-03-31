import React,{useState, useEffect} from 'react';
import {Navbar} from './Components/Navbar/Navbar';
import {BrowserRouter,Switch,Route}from 'react-router-dom';
import {Home} from './Components/Home/Home';
import {Signup} from './Components/Signup/Signup';
import {Login} from './Components/Login/Login';
import {Products} from './Components/Products/Products';
import {Admin} from './Components/admin/admin';
import {AddProducts} from './Components/AddProducts';
import {Cart} from './Components/Cart/Cart';
import {auth,firestore} from './Config/Config';
export const App=()=>{
  function GetCurrentUser(){
    const [user, setUser]=useState(null);
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                firestore.collection('users').doc(user.uid).get().then(snapshot=>{
                    setUser(snapshot.data().Username);
                })
            }
            else{
                setUser(null);
            }
        })
    },[])
    return user;
}
const user = GetCurrentUser();
function GetTotalProducts(){
  const [totalProducts, setTotalProducts]=useState(0);
 // getting cart products   
 useEffect(()=>{        
     auth.onAuthStateChanged(user=>{
         if(user){
             firestore.collection('Cart ' + user.uid).onSnapshot(snapshot=>{
                 const qty = snapshot.docs.length;
                 setTotalProducts(qty);
             })
         }
     })       
 },[])  
  return totalProducts;
}
const totalProducts = GetTotalProducts();

  return(
    <BrowserRouter>
    <Navbar user={user} totalProducts={totalProducts}/>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/signup" component={Signup}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/products" component={Products}/>
      <Route exact path="/cart" component={Cart}/>
      <Route exact path="/addproducts" component={AddProducts}/>
      <Route exact path="/admin" component={Admin}/>
    </Switch>

    </BrowserRouter>
  )
}
export default App;