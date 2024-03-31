import React from 'react';
import add from './add.png';
import {AddProducts} from '../AddProducts';
import {Link,useHistory} from 'react-router-dom';
import './admin.css';

export const Admin=()=>{
    let history=useHistory();
    function redir(){
        history.push('/addproducts');
    }
    function viewpay(){
        window.location.replace('https://dashboard.stripe.com/test/payments');
    }
    return(
        <div>
          <img src={add} id="admin" />
          <div className='btnadd'>
            <button className='add'style={{height:"150px",width:"250px",borderRadius:"50px"}} onClick={redir}>Add Products&nbsp;&nbsp;<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
</svg></button>
<br/>
<br/>
<br/>
<br/>
<br/>
<button className='pay'style={{height:"150px",width:"250px",borderRadius:"50px"}} onClick={viewpay}>View Payments&nbsp;&nbsp;<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-credit-card-2-front-fill" viewBox="0 0 16 16">
  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2.5 1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-2zm0 3a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
</svg></button>
          </div>
          
        </div>
    )
}