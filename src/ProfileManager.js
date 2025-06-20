import React, {useState,useRef } from "react";
import styles from "./NewGoodAndPerson.module.css";
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate,useLoaderData,Navigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import Url from "./Url";
function ProfileManager(){
  const [email,setEmail]=useState();
  const [name,setName]=useState();
  const [profPic,setProfPic]=useState();
  const nav=useNavigate();
  const passwordInput= useRef('');
  const passwordConfirmationInput= useRef('');
  let allData=useRef(useLoaderData());
  const [password,setPassword]=useState('password');
  const [passwordConfirmation,setPasswordConfirmation]=useState('password');
  const popupToggle=useRef();
  const popupTwoToggle=useRef();
  var resp=false; 
  const showPopupTwo=()=>{
    popupTwoToggle.current.style.display="block";
    setTimeout(()=>popupTwoToggle.current.style.display="none", 1200);
    }
  const togglePasswordField =()=>{
    if(password==='text')
    {
     setPassword('password');
    }else{
     setPassword('text');
    }
  }


  
  const togglePasswordConfirmationField =()=>{
    if(passwordConfirmation==='text')
    {
      setPasswordConfirmation('password');
    }else{
      setPasswordConfirmation('text');
    }
  }

 


const AddPerson=async()=>{
   if(passwordInput.current.value &&  passwordInput.current.value===passwordConfirmationInput.current.value && email && name)
   {

    let tmpData={
                 password:passwordInput.current.value,
                 password_confirmation:passwordConfirmationInput.current.value,
                 email:email,
                 name:name,
                 image:profPic
                }
             try{
               resp= await axios.post(Url+'api/editProfile', tmpData, {
                headers: {
                  'X-Requested-With':'XMLHttpRequest',
                  'Content-Type': 'multipart/form-data'
                },
                withCredentials: true,

            });
              if(typeof(resp)==='boolean')
              {
               resp && showPopupTwo()
              } 
              else{  
              resp &&  !('error' in resp) ? showPopupTwo():showPopup();
              }
            }catch(e){
              showPopup()
            }
   }else
   {
    showPopup();
   }
}

const showPopup=()=>{
  popupToggle.current.style.display="block";
  setTimeout(()=>popupToggle.current.style.display="none", 1200);
  }


  
return(
  <div className={styles.Page}>

      <div ref={popupToggle} className={styles.Popup}>
       Data You entered are not valid!
      </div>
      <div ref={popupTwoToggle} className={styles.PopupTwo}>
        Done!
      </div>
      <div className={styles.Topic}>
        Edit Profile
      </div>
        <div className={styles.Card} >
            <div className={styles.Heading}>Person Details</div>
        
           
            <div className={styles.Grid} >
              <input type="email"  className={styles.Input} placeholder="Email" onChange={(e)=>setEmail(e.target.value)}   value={email||''}/>
              <input type="text" step="1" min="0" className={styles.Input} placeholder="Name" onChange={(e)=>setName(e.target.value)} value={name||''}/>
              <div className={styles.PasswordWrapper} >
                <input className={styles.Password} placeholder="Password" ref={passwordInput}  type={password}/>
                <FontAwesomeIcon className={styles.Eye } onClick={togglePasswordField} icon={faEye}></FontAwesomeIcon>
              </div> 
              <div className={styles.PasswordWrapper} >
                <input className={styles.Password} placeholder="Password Confirmation" ref={passwordConfirmationInput}  type={passwordConfirmation}/>
                <FontAwesomeIcon className={styles.Eye } onClick={togglePasswordConfirmationField} icon={faEye}></FontAwesomeIcon>
              </div>            
              <input type="file" accept="image/*"  className={styles.Input} placeholder="Profile picture" onChange={(e)=>setProfPic(e.target.files[0])} />

              </div>
            <div className={styles.ButtonsArea}>
              <div onClick={()=>AddPerson()} className={styles.Button}>
                Add
              </div>
            </div>
        </div> 
    </div> 
);
}

export default ProfileManager;