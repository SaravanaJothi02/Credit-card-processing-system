import React,{useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import './Signup.css';
import {auth, firestore} from '../../Config/Config';
export const Signup=()=>{
    const history=useHistory();
    const [userName,setUsername]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirm_password,setConfirmPassword]=useState('');
    const [errorMsg,setErrorMsg]=useState('');
    const [successMsg,setSucessMsg]=useState('');
    const handleSignup=(e)=>{
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email,password).then((credentials)=>{
            console.log(credentials);
            firestore.collection('users').doc(credentials.user.uid).set({
                Username:userName,
                Email:email,
                Password:password
            }).then(()=>{
                setSucessMsg('Sigin Successful.You are redirected to login');
                setErrorMsg('');
                setUsername('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setTimeout(()=>{
                    setSucessMsg('');
                    history.push('/login');
                },2000).catch((error)=>{
                    setErrorMsg(error.message);
                })
            })
        }).catch((error)=>{
            alert(error.message);
        })
    }
    return(
        <div class="signup-form" id="signin">
           <form action="" method="post" onSubmit={handleSignup}>
		<h2>Sign Up</h2>
		<p>Please fill in this form to create an account!</p>
		<hr/>
        {successMsg&& <>
            <div className='success-msg'>{successMsg}</div>
        </>}
        <div class="form-group">
			<div class="input-group">
				<span class="input-group-addon"><i class="fa fa-user"></i></span>
				<input type="text" class="form-control" name="username" placeholder="Username" required="required" onChange={(e)=>setUsername(e.target.value)} value={userName}/>
			</div>
        </div>
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
			<div class="input-group">
				<span class="input-group-addon">
					<i class="fa fa-lock"></i>
					<i class="fa fa-check"></i>
				</span>
				<input type="password" class="form-control" name="password" placeholder="Confirm Password" required="required" onChange={(e)=>setConfirmPassword(e.target.value)} value={confirm_password}/>
			</div>
        </div>
		<div class="form-group">
            <button type="submit" class="btn btn-primary btn-lg">Sign Up</button>
        </div>
    </form>
	<div class="text-center">Already have an account? <Link to="/login">Login here</Link></div>

    </div>
    
    )
}
export default Signup;