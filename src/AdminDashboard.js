// import styles from './AdminDashboardAndPManager.module.css';
import AutocompleteSearch from './AutocompleteSearch';
import CustomSelect from './CustomSelect';
// import RadioButton from './RadioButton';
import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
// import { useLoaderData } from 'react-router-dom';
function AdminDashboard() {
  const navigate=useNavigate();
  // const availableProducts=useLoaderData();
  const [name,setName]=useState("All");
  const [screen,setScreen]=useState(window.innerWidth);
  const [val,setVal]=useState();
  window.onresize = function() {
   setScreen(window.innerWidth)
};
const viewData=(element)=>{
  navigate('/searchResults/'+element.table+'/'+element.id);

}
  return (
   <div>
    { screen > 768 ?(
     <div> 
        <AutocompleteSearch url={'search'+name} value={val} setValue={(e)=>setVal(e.target.value)} elementClick={viewData}/>
        {/* <div className={styles.RadioButtonsArea}>
          <div className={styles.Quater}>
            <RadioButton   text="All"  setName={setName} name={name}   value="All"/> 
          </div>
          <div className={styles.Quater} >
            <RadioButton   text="Projects"  setName={setName} name={name}   value="Projects"/> 
          </div>
          <div className={styles.Quater} >
            <RadioButton   text="People"  setName={setName} name={name}   value="People"/> 
          </div>
          <div className={styles.Quater} >
            <RadioButton   text="Products"  setName={setName} name={name}   value="Products"/> 
          </div>        
        </div> */}
     </div> 
      ):
      (
       <div > 
        {/* <CustomSelect setCurrentVal={setName} optionData={['All','Projects','People','Products']} /> */}
        <AutocompleteSearch url={'search'+name} value={val} setValue={(e)=>setVal(e.target.value)} elementClick={viewData}/>
       </div>
      )} 
      {/* <div className={styles.CardsArea}>
        <div className={styles.Card}>
          <h2 className={styles.CardText} >{availableProducts?.success}</h2>
          <h2 className={styles.CardText}  >Available Products</h2>  
        </div>
        <div className={styles.Card}>
          <h2 className={styles.CardText}>Connected People</h2>  
        </div>
        <div className={styles.Card}>
          <h2 className={styles.CardText}>Ongoing Projects</h2>  
        </div>
        <div className={styles.Card}>
          <h2 className={styles.CardText}>Properties</h2>    
        </div>
      </div> */}
    </div>   
  );
}

export default AdminDashboard;