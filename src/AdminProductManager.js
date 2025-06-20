import styles from './AdminDashboardAndPManager.module.css';
import React, { useState,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
function AdminProductManager() {
  const nav=useNavigate();

  const popupToggle=useRef();

const checkNav=(route)=>{
if(sessionStorage.getItem('role')==='admin')
    {
 nav(route);
}
else if(JSON.parse(sessionStorage.getItem('ability'))?.find(obj => obj.table === 'good' && obj.method === 'create'))
{
  nav(route);

}
else{
 showPopup();
}
}
 const showPopup=()=>{
    popupToggle.current.style.display="block";
    setTimeout(()=>popupToggle.current.style.display="none", 1200);
    }
  const [screen,setScreen]=useState(window.innerWidth);
  window.onresize = function() {
   setScreen(window.innerWidth)
   console.log(screen);
};
  return (
   <div>

    <div ref={popupToggle} className={styles.Popup}>
      You are Not Authorized!
    </div>
    <div className={styles.ButtonsArea}>
      <button onClick={()=>checkNav('/newGrn')} className={styles.Button}  >Stock Received</button>
      <button onClick={()=>checkNav('/newSale')} className={styles.Button} >New Sale</button>
      <button onClick={()=>nav('/salesAndReceived')} className={styles.Button} >Reports</button>

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
      {/* <div className={styles.CardsArea}>
        <div className={styles.Card}>
          <h2 className={styles.CardText} >{data.spend_for_buy_products} LKR</h2>  
          <h2 className={styles.CardText} >Worth stocks Received</h2>  

          <p className={styles.DetailedView}>Detailed view</p>
        </div>
        <div  className={styles.Card}>
           <h2 className={styles.CardText} >{data.received_from_sale_products} LKR</h2>  
           <h2 className={styles.CardText} >Worth sales</h2>  
           <p className={styles.DetailedView}>Detailed view</p>

        </div>
        <div  className={styles.Card}>
           <h2 className={styles.CardText} >{data.promised_to_receive} LKR</h2>  
           <h2 className={styles.CardText} >To be received</h2>  
           <p className={styles.DetailedView}>Detailed view</p>

        </div>
        <div  className={styles.Card}>
           <h2 className={styles.CardText} >{data.promised_to_pay} LKR</h2>  
           <h2 className={styles.CardText} >Pending payments</h2>  
           <p className={styles.DetailedView}>Detailed view</p>

        </div>
      </div> */}
    </div>   
  );
}

export default AdminProductManager;