import React, { useEffect, useState,useRef } from "react";
import styles from "./NewGoodAndPerson.module.css";
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate,useLoaderData,Navigate } from "react-router-dom";
import  * as All  from './requests';   
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomSelect from "./CustomSelect";
function NewPerson(){
  const [topic,setTopic] =useState();
  const [dealerType,setDealerType] =useState();
  const [profession,setProfession] =useState();
  const [email,setEmail]=useState([]);
  const [name,setName]=useState();
  const [data,setData]=useState([]);
  const nav=useNavigate();
  const location =useLocation();
  const passwordInput= useRef('');
  const passwordConfirmationInput= useRef('');
  let allData=useRef(useLoaderData());
  const [password,setPassword]=useState('password');
  const [passwordConfirmation,setPasswordConfirmation]=useState('password');
  const popupToggle=useRef();
  const popupTwoToggle=useRef();
  let resp=false; 
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

  useEffect(()=>{
    if(location.pathname==='/newSupplier')
    { setTopic('New Supplier'); setDealerType('supplier'); 
  }else if(location.pathname==='/newCustomer')
  {
    setTopic('New Customer'); setDealerType('customer');
  }
  else if(location.pathname==='/newEmployee')
  {
    setTopic('New Employee'); setDealerType('employee');
    Array.isArray(allData.current) && allData.current.length!=='0' &&
      setData(allData.current.map((element)=>{ return element.post}));
     setProfession(allData.current[0].post);
  }

   },[location])



const AddPerson=async()=>{
   if(passwordInput.current.value &&  passwordInput.current.value===passwordConfirmationInput.current.value && profession && email && name)
   {

    let tmpData={
                 password:passwordInput.current.value,
                 password_confirmation:passwordConfirmationInput.current.value,
                 email:email,
                 name:name,
                 profession_id:allData.current.find(item => item.post === profession).id,
                 role:4,
                 description:'none'
                }
             
               resp= await All.newPerson(tmpData);
              if(typeof(resp)==='boolean')
              {
               resp && showPopupTwo()
              } 
              else{  
              resp &&  !('error' in resp) ? showPopupTwo():showPopup();
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
  sessionStorage.getItem('role')==='admin' || (JSON.parse(sessionStorage.getItem('ability'))?.find(obj => obj.table === 'user' && obj.method === 'create'))
?
  <div className={styles.Page}>

      <div ref={popupToggle} className={styles.Popup}>
       Data You entered are not valid!
      </div>
      <div ref={popupTwoToggle} className={styles.PopupTwo}>
        Done!
      </div>
      <div className={styles.Topic}>
       Add {topic}
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
                { dealerType==='employee' &&
                  <div  >                
                      <CustomSelect setCurrentVal={setProfession} optionData={data|| null}/>
                      <div className={styles.KeepSpace}></div>

                  </div>  
                }    
              </div>
            <div className={styles.ButtonsArea}>
              <div onClick={()=>nav(-1)} className={styles.Button}>
                    Back
              </div>
              <div onClick={()=>AddPerson()} className={styles.Button}>
                Add
              </div>
            </div>
        </div> 
    </div> 
        :  <Navigate to="/login"  replace />  

);
}

export default NewPerson;