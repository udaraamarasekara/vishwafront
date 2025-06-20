import styles from './RadioButton.module.css';
import React from 'react';

function RadioButton({text,setName,name,value}){

  return(
    <div className={styles.RadioButtonContainer} >
        <div  onClick={()=>{setName(value)}} className={styles.RadioButton}>
            {
             name===value &&  <div className={styles.ActiveRadioButton} ></div>  
            }
        </div>
        <div className={styles.Label} >{text}</div>
       
    </div>
  );
}

export default RadioButton;