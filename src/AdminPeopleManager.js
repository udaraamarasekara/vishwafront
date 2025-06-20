import styles from './AdminDashboardAndPManager.module.css';
import React, { useState,useRef } from 'react';
import {useLoaderData, useNavigate,Navigate } from 'react-router-dom';
function AdminPeopleManager() {
  const popupToggle=useRef();
  const nav=useNavigate();
  const data =useLoaderData();
  const [screen,setScreen]=useState(window.innerWidth);
  window.onresize = function() {
   setScreen(window.innerWidth)
   console.log(screen);
};
const [msg ,setMsg]=useState( 'You must have at least one profession !');

const showPopup=()=>{
popupToggle.current.style.display="block";
setTimeout(()=>popupToggle.current.style.display="none", 1200);
}
 const checkAndNav=()=> {   if( data.professions !== 0 ){ checkForNav('/newEmployee') }else{ 
 setMsg('You are Not Authorized!');
 showPopup();}
}
 
 const checkForNav=(route)=>{
  if(sessionStorage.getItem('role')==='admin')
  {
   nav(route);
  }
  else if(JSON.parse(sessionStorage.getItem('ability'))?.find(obj => obj.table === 'user' && obj.method === 'create'))
  {
    nav(route);
  
  }
  else{
   setMsg('You are Not Authorized!'); 
   showPopup();
  }

  
 }
  return (
    sessionStorage.getItem('role')==='admin' || ((JSON.parse(sessionStorage.getItem('ability'))?.find(obj => obj.table === 'profession' && obj.method === 'create'))
   || (JSON.parse(sessionStorage.getItem('ability'))?.find(obj => obj.table === 'user' && obj.method === 'create')))
      ?
   <div>

      <div ref={popupToggle} className={styles.Popup}>
          {msg}
      </div>
    <div className={styles.ButtonsArea}>
      <button onClick={()=>checkAndNav()} className={styles.Button}  >New Employee</button>
      <button onClick={()=>nav('/newProfession')} className={styles.Button} >New Profession</button>
      <button onClick={()=>checkForNav('/newSupplier')} className={styles.Button} >New Supplier</button>
      <button onClick={()=>checkForNav('/newCustomer')} className={styles.Button} >New Customer</button>

    </div>
    {/* { screen > 768 ?(
      <div className={styles.RadioButtonsArea}>
        <div className={styles.Quater} >
          <RadioButton   text="All time"  setName={setName} name={name}   value="AllTime"/> 
        </div>
        <div className={styles.Quater}>
          <RadioButton   text="This year"  setName={setName} name={name}   value="ThisYear"/> 
        </div>  
        <div className={styles.Quater}>
          <RadioButton   text="This month"  setName={setName} name={name}   value="ThisMonth"/> 
        </div>
        <div className={styles.Quater} >
          <RadioButton   text="This week"  setName={setName} name={name}   value="ThisWeek"/> 
        </div>  
        <div className={styles.Quater}>
          <RadioButton   text="Today"  setName={setName} name={name}   value="Today"/> 
        </div>      
      </div>
      ):
      (
        <CustomSelect setCurrentVal={setName} optionData={['All time','This year','This month','This week','Today']} />

      )}  */}
      <div className={styles.CardsArea}>
        <div className={styles.Card}>
          <h2 className={styles.CardText} >{data.customers}</h2>  
          <h2 className={styles.CardText} >Customers</h2>  

          {/* <p className={styles.DetailedView}>Detailed view</p> */}
        </div>
        <div  className={styles.Card}>
           <h2 className={styles.CardText} >{data.suppliers} </h2>  
           <h2 className={styles.CardText} >Suppliers</h2>  
           {/* <p className={styles.DetailedView}>Detailed view</p> */}

        </div>
        <div  className={styles.Card}>
           <h2 className={styles.CardText} >{data.employees} </h2>  
           <h2 className={styles.CardText} >Employees</h2>  
           {/* <p className={styles.DetailedView}>Detailed view</p> */}

        </div>
        <div  className={styles.CardLast}>
           <h2 className={styles.CardText} >{data.professions}</h2>  
           <h2 className={styles.CardText} >Professions</h2>  
           {/* <p className={styles.DetailedView}>Detailed view</p> */}

        </div>
      </div>
    </div> 
    :  <Navigate to="/login"  replace />  
  );
}

export default AdminPeopleManager;