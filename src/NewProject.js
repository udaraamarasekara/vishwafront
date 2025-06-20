import React, {useState,useRef } from "react";
import styles from "./NewGoodAndPerson.module.css";
import {useNavigate,Navigate } from "react-router-dom";

import  * as All  from './requests';   
function NewProject(){
  const [name,setName] =useState();
  const [description,setDescription] =useState();
  const nav=useNavigate();
  const popupToggle=useRef();
  const popupTwoToggle=useRef();
 let resp=false;




  
 






const  AddProject=async()=>{
   if( description && name)
   {

    let tmpData={
                 description:description,
                 name:name,
                }
             
            resp= await All.newProject(tmpData);
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
const showPopupTwo=()=>{
    popupTwoToggle.current.style.display="block";
    setTimeout(()=>popupTwoToggle.current.style.display="none", 1200);
    }
const showPopup=()=>{
  popupToggle.current.style.display="block";
  setTimeout(()=>popupToggle.current.style.display="none", 1200);
  }


  
return(
  sessionStorage.getItem('role')==='admin' || (JSON.parse(sessionStorage.getItem('ability'))?.find(obj => obj.table === 'project' && obj.method === 'create'))
  ?
  <div className={styles.Page}>
      <div ref={popupTwoToggle} className={styles.PopupTwo}>
        Done!
      </div>
      <div ref={popupToggle} className={styles.Popup}>
       Data You entered are not valid!
      </div>
      <div className={styles.Topic}>
       Add  New Project
      </div>
        <div className={styles.Card} >
            <div className={styles.Heading}>Project Details</div>
        
           
            <div className={styles.Grid} >
              <input type="text" step="1" min="0" className={styles.Input} placeholder="Name" onChange={(e)=>setName(e.target.value)} value={name||''}/>
              <input type="text"  className={styles.Input} placeholder="Description" onChange={(e)=>setDescription(e.target.value)}   value={description||''}/>
            </div>
            <div className={styles.ButtonsArea}>
              <div onClick={()=>nav(-1)} className={styles.Button}>
                    Back
              </div>
              <div onClick={()=>AddProject()} className={styles.Button}>
                Add
              </div>
            </div>
        </div> 
    </div> 
    :  <Navigate to="/login"  replace />  
  );
}

export default NewProject;