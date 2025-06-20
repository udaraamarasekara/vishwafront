import styles from './CheckedBox.module.css'
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
function CheckedBox({status,setStatus,text})
{
 const [checkedBoxStatus,setCheckedBoxStatus]=useState(status);
const changeStatus=()=>{
  setCheckedBoxStatus(!checkedBoxStatus);
  setStatus(!checkedBoxStatus);  
}
useEffect(()=>{
  if(sessionStorage.getItem('loginPage') ==='true'){
    document.documentElement.style.setProperty('--theme','rgba(255,255,255,1)');
    document.documentElement.style.setProperty('--ml','32.5%');

  }
  else{
    document.documentElement.style.setProperty('--theme','rgba(0,0,0,0.5)');
    document.documentElement.style.setProperty('--ml','0');

  }

},[])
  return (
   <div className={styles.container} >
        <div className={styles.square} onClick={changeStatus}>
         {  checkedBoxStatus && <FontAwesomeIcon className={styles.img} icon={faCheck}/>
         }
        </div>
        <div className={styles.text}> {text}</div>
        
   </div> 
  )
}

export default CheckedBox;