import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import axiosInstanse from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';

const Login= ({setCurrPage}) => {

 const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const {updateUser} = useContext(UserContext);

  const navigate = useNavigate();

// hadle login form submit
  const handleLogin = async (e) => {
     e.preventDefault();


     if(!validateEmail(email)) {
    setError("Please enter a valid email address.");
    return;
  } 

  if(!password) {
    setError("Password must be at least 8 characters long.");
    return;
  }
  setError("");

  // Login Api Call

  try {
    const response = await axiosInstanse.post(API_PATHS.AUTH.LOGIN,{
      email,password
    });
     
    
    const {token} = response.data;

    if(token){
      localStorage.setItem("token",token);
      updateUser(response.data);
      navigate("/dashboard");
    }


  } catch (error) {
    if(error.response && error.response.data.message) {
       setError(error.response.data.message);
    }else{
      setError("An unexpected error occurred. Please try again later.");
    }
    
  }

  } 

  


  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
      <h3 className='text-lg font-bold text-black'>Welcome Back</h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6'>Please enter your details to login</p>

      <form onSubmit={handleLogin}>
           <Input 
           value={email}
           onChange={({target}) => setEmail(target.value)}
           label="Email Address"
           placeholder="name@example.com"
           type="email"
           />
             
           <Input    
            value={password}
            onChange={({target}) => setPassword(target.value)}
            label="Password"
            placeholder="Enter your password"
            type="password"
           />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <button type='submit' className='btn-primary'>Login</button>

          <p className='text-[15px] text-slate-800 mt-3'>
            Don't have an account?{" "}
            <button className='font-medium text-primary underline cursor-pointer'
            onClick={()=>{setCurrPage("signup")}} 
            >SignUp</button>
          </p>

      </form>
    </div>
  )
}

export default Login
