import styles from './Login.module.css';
import Api from './Api';
import React,{ useRef, useState } from 'react';
import {useLoaderData, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CheckedBox from './CheckedBox';
import { faEye } from '@fortawesome/free-solid-svg-icons';
function Login() {
const emailInput =useRef('');
const passwordInput= useRef('');
const popupToggle=useRef();
const [password,setPassword]=useState('password');
const logStatus = useLoaderData();
const [remember,setRemember]=useState(false);
const navigate=useNavigate();

const togglePasswordField =()=>{
  if(password==='text')
  {
   setPassword('password');
  }else{
   setPassword('text');
  }
}

const  loginSubmit = async ()=>{
  const data={
    email:emailInput.current.value,
    password:passwordInput.current.value,
    remember: remember
  }
  
      
      if(logStatus)
      {
        popupToggle.current.innerText="Something went Wrong!";
        popupToggle.current.style.display="block";
        setTimeout(()=>popupToggle.current.style.display="none", 1200);
      }

      Api.get("sanctum/csrf-cookie").then(() => {
      Api.post('api/login',data).then((res)=>{
        if(res.data.error)
        {
        popupToggle.current.style.display="block";
        setTimeout(()=>popupToggle.current.style.display="none", 1200);
        } 
        else if(res==='Invalid request!' || res.data.user==='Invalid Entry' )
        {
        popupToggle.current.style.display="block";
        setTimeout(()=>popupToggle.current.style.display="none", 1200);  
        sessionStorage.getItem('auth') && sessionStorage.removeItem('auth');
        navigate('/login');
        }
        else
        {
         sessionStorage.setItem('ability',res.data.user.abilities?JSON.stringify(res.data.user.abilities):null);
         sessionStorage.setItem('role', res.data.user.role);
         sessionStorage.setItem('auth',true);
         sessionStorage.setItem('name',res.data.user.name);
         sessionStorage.setItem('image',res.data.user.image);


        navigate('/');
        }
      }).catch((e)=>
      {
        popupToggle.current.innerText="Something went Wrong!";
        popupToggle.current.style.display="block";
        setTimeout(()=>popupToggle.current.style.display="none", 1200);
      });
      
    })
  }
 
  ;
  

  return (
    <div className={styles.Page}>
      <div ref={popupToggle} className={styles.Popup}>
        Invalid entry !
      </div>
      <h1 className={styles.Heading} >Vishwa Motors Stock</h1>
      <input placeholder="Email" ref={emailInput} className={styles.Email} type="text"/>
      <div className={styles.PasswordWrapper} >
        <input className={styles.Password} placeholder="Password" ref={passwordInput}  type={password}/>
        <FontAwesomeIcon className={styles.Eye } onClick={togglePasswordField} icon={faEye}></FontAwesomeIcon>
      </div>
      <CheckedBox text='Remember me' status={remember} setStatus={setRemember} />
      <input className={styles.Button} onClick={loginSubmit} type="submit"/>
    </div>
  );
}

export default Login;
