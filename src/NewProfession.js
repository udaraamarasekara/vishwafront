import React, { useState,useRef } from "react";
import styles from "./NewGoodAndPerson.module.css";
import { useNavigate,Navigate } from "react-router-dom";
import  * as All  from './requests';   
import CheckedBox from "./CheckedBox";
function NewProfession(){
  const [post,setPost] =useState();
  const [basicSalary,setBasicSalary] =useState();
  const [agreement,setAgreement] =useState();
  const [addGood,setAddGood]=useState();
  const [addUser,setAddUser]=useState();
  const [deleteGood,setDeleteGood]=useState();
  const [addProject,setAddProject]=useState();
  const [editProject,setEditProject]=useState();
  const [addProfession,setAddProfession]=useState();
  const [editProfession,setEditProfession]=useState();
  const popupToggle=useRef();

  const [editGood,setEditGood]=useState();
  const popupTwoToggle=useRef();
  let resp=false;
  const nav=useNavigate();
  const AddProfession=async()=>{
   
    let abilitiesTmp=[];
    if(addGood)
    {
      abilitiesTmp.push('addGood');  
    }
    if(editGood)
    {
      abilitiesTmp.push('editGood');  
    }
    if(deleteGood)
    {    
      abilitiesTmp.push('deleteGood');
    }
    if(addProfession)
    {
     abilitiesTmp.push('addProfession')
    }
    if(addProfession)
      {
       abilitiesTmp.push('addProject')
      }
    
    if(post && agreement && basicSalary &&  abilitiesTmp.length )
    { 
        let data={
            post:post,
            agreement:agreement,
            basic_salary:basicSalary,
            abilities:abilitiesTmp
        }
        resp=  await All.newProfession(data);
        if(typeof(resp)==='boolean')
          {
           resp && showPopupTwo()
          } 
          else{  
          resp &&  !('error' in resp) ? showPopupTwo():showPopup();
          }    }
   
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
  sessionStorage.getItem('role')==='admin' || (JSON.parse(sessionStorage.getItem('ability'))?.find(obj => obj.table === 'profession' && obj.method === 'create'))

    ?
  <div className={styles.Page}>
     <div ref={popupToggle} className={styles.Popup}>
       Data You entered are not valid!
      </div>
     <div ref={popupTwoToggle} className={styles.PopupTwo}>
        Done!
      </div>
      <div className={styles.Topic}>
       Add new Profession
      </div>
        <div className={styles.Card} >
            <div className={styles.Heading}>Profession Details</div>
        
           
            <div className={styles.Grid} >
              <input type="text" step="any" min="0" className={styles.Input} placeholder="Post" onChange={(e)=>setPost(e.target.value)}   value={post||''}/>
              <input type="text" step="any" min="0" className={styles.Input} placeholder="Basic salary" onChange={(e)=>setBasicSalary(e.target.value)} value={basicSalary||''}/>
              <input type="text" step="any" min="0" className={styles.Input} onChange={(e)=>setAgreement(e.target.value)} placeholder="Agreement" value={agreement||''}/>
              
            </div>
            <label className={styles.LblAbility} >Role Capabilities</label>
            <div className={styles.GridP}>
                <div className={styles.CheckBoxes}>
                     <CheckedBox text="Add Good Transaction" status={addGood} setStatus={setAddGood} />

                </div>
                <div className={styles.CheckBoxes}>
                    <CheckedBox text="Edit Good Transaction" status={editGood} setStatus={setEditGood} />

                </div>
                <div className={styles.CheckBoxes}>
                    <CheckedBox text="Delete Good Transaction" status={deleteGood} setStatus={setDeleteGood} />

                </div>
                <div className={styles.CheckBoxes}>
                    <CheckedBox text="Add User" status={addUser} setStatus={setAddUser} />

                </div>
               
                <div className={styles.CheckBoxes}>
                    <CheckedBox text="Add Project" status={addProject} setStatus={setAddProject} />

                </div>
                <div className={styles.CheckBoxes}>
                    <CheckedBox text="Edit Project" status={editProject} setStatus={setEditProject} />

                </div>
                <div className={styles.CheckBoxes}>
                    <CheckedBox text="Add Profession" status={addProfession} setStatus={setAddProfession} />

                </div>
                <div className={styles.CheckBoxes}>
                    <CheckedBox text="Edit Profession" status={editProfession} setStatus={setEditProfession} />

                </div>
                

                


            </div>
            <div className={styles.ButtonsArea}>
              <div onClick={()=>nav(-1)} className={styles.Button}>
                    Back
              </div>
              <div onClick={()=>AddProfession()} className={styles.Button}>
                Add
              </div>
            </div>
        </div> 
    </div> 
    :  <Navigate to="/login"  replace />  
  );
}

export default NewProfession;