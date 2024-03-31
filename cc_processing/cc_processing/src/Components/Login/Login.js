import React,{useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import './Login.css';
import {auth, firestore} from '../../Config/Config';
export const Login=()=>{
    const history=useHistory();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [errorMsg,setErrorMsg]=useState('');
    const [successMsg,setSucessMsg]=useState('');
    const handleLogin=(e)=>{
        e.preventDefault();
        auth.signInWithEmailAndPassword(email,password).then(()=>{
            setSucessMsg('Login Successful');
                setEmail('');
                setPassword('');
                setErrorMsg('');
                setTimeout(()=>{
                    setSucessMsg('');
                    if(email==='admin@gmail.com'){
                        history.push('/admin');
                    }
                    else{
                    history.push('/products');
                    }
                },3000)
            }).catch(error=>
                    alert(error.message)
                    );   
    }
    return(
        <div class="login-form" id="login">
           <form action="" method="post" onSubmit={handleLogin}>
		<h2>Login</h2>
		<p>Please fill in this form to Login!</p>
		<hr/>
        {successMsg&& <>
            <div className='success-msg'>{successMsg}</div>
        </>}
        <div class="form-group">
			<div class="input-group">
				<span class="input-group-addon"><i class="fa fa-paper-plane"></i></span>
				<input type="email" class="form-control" name="email" placeholder="Email Address" required="required" onChange={(e)=>setEmail(e.target.value)} value={email}/>
			</div>
        </div>
		<div class="form-group">
			<div class="input-group">
				<span class="input-group-addon"><i class="fa fa-lock"></i></span>
				<input type="password" class="form-control" name="password" placeholder="Password" required="required" onChange={(e)=>setPassword(e.target.value)} value={password}/>
			</div>
        </div>
		<div class="form-group">
            <button type="submit" class="btn btn-primary btn-lg">Login</button>
        </div>
    </form>
    <div class="text-center">Don't have an account? <Link to="/signup">Signup here</Link></div>
    
    </div>
    )
}
export default Login;