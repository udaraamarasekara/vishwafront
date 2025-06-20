import styles from './AdminPortal.module.css';
import {Outlet,useLocation, useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import React, { useState,} from 'react';
import { logOut } from './requests';
import { useRef } from 'react';
import Url from './Url';
function AdminPortal() {
  let location=useLocation();  
  const nav = useNavigate();
  const [screen,setScreen]=useState(window.innerWidth);
  window.onresize = function() {
   setScreen(window.innerWidth)
};
const popupToggle=useRef();

  const logoutUser =async() =>{
   await logOut(); 
   nav('/login'); 
  }

const showPopup=()=>{
   popupToggle.current.style.display="block";
   setTimeout(()=>popupToggle.current.style.display="none", 1200);
   }

const checkAndNav=(route)=>{
   var table = route==='/productManager'? 'good':route==='/projectManager'?'project':'profession'  
  if(sessionStorage.getItem('role')==='admin')
      {
    nav(route);
   }
   else if(JSON.parse(sessionStorage.getItem('ability'))?.find(obj => obj.table === table && obj.method === 'create'))
   {
    if(table==='profession') 
      {
         if(JSON.parse(sessionStorage.getItem('ability'))?.find(obj => obj.table === 'user' && obj.method === 'create'))
            {
             nav(route);
            }
           else if(JSON.parse(sessionStorage.getItem('ability'))?.find(obj => obj.table === 'profession' && obj.method === 'create'))
               {
                nav(route);
               }
            else
            {
               showPopup();

            }
      } else
      {
       nav(route);
      }
   }
   else{
    showPopup();
   }
}

  const [mobileNavShow,setMobileNavShow]=useState(false);
  return (
    <div className={styles.Page}>
     {screen >=768 && (
        
      <div className={styles.SideNav}>
       
         <img className={styles.ProfilePicture} src={Url+'profilePic/'+sessionStorage.getItem('image')}/>

         <p className={styles.UserName}>{sessionStorage.getItem('name')}</p>
         <hr className={styles.HR}></hr>
        <div className={styles.NavItemGroup}>
           <div onClick={()=>nav('/')} className={location.pathname==='/'? styles.SelectedNavItem : styles.NavItem}>
              Dashboard 
           </div> 
           <div onClick={()=>checkAndNav('/projectManager')}  className={location.pathname==='/projectManager'? styles.SelectedNavItem : styles.NavItem}>
              Project Manager
           </div> 
           <div onClick={()=>checkAndNav('/productManager')}  className={location.pathname==='/productManager'? styles.SelectedNavItem : styles.NavItem}>
              Product Manager
            </div> 
            <div onClick={()=>checkAndNav('/adminPeopleManager')}  className={location.pathname==='/adminPeopleManager'? styles.SelectedNavItem : styles.NavItem}>
              People Manager
            </div>
            <div onClick={()=>checkAndNav('/profileManager')}  className={location.pathname==='/profileManager'? styles.SelectedNavItem : styles.NavItem}>
              Profile 
            </div>
        </div>
      </div>)
      }
      <div className={styles.NavBar}>
         {
            screen <768 &&
            (
            <FontAwesomeIcon onClick={()=>setMobileNavShow(!mobileNavShow)} className={styles.MenuIcon} icon={faBars}></FontAwesomeIcon>
            )  
         }
      <div className={styles.Logout} onClick={logoutUser}>Logout</div>
         </div>
      <div className={styles.RestPage}>
      
         {
          screen < 768 && mobileNavShow &&  
          (
            <div className={styles.MobileNav}>
               <div onClick={()=>{nav('/');setMobileNavShow(false)}} className={location.pathname==='/'? styles.SelectedNavItem : styles.NavItem}>
                  Dashboard 
               </div> 
               <div onClick={()=>{setMobileNavShow(false);checkAndNav('/projectManager')}} className={location.pathname==='/projectManager'? styles.SelectedNavItem : styles.NavItem}>
                  Project Manager
               </div> 
               <div onClick={()=>{setMobileNavShow(false);checkAndNav('/productManager')}}  className={location.pathname==='/productManager'? styles.SelectedNavItem : styles.NavItem}>
                  Product Manager
               </div> 
               <div  onClick={()=>{setMobileNavShow(false);checkAndNav('/adminPeopleManager')}} className={location.pathname==='/employeeManager'? styles.SelectedNavItem : styles.NavItem}>
                  People Manager
               </div>
               <div  onClick={()=>{setMobileNavShow(false); checkAndNav('/profileManager')}} className={location.pathname==='/profileManager'? styles.SelectedNavItem : styles.NavItem}>
                  Profile Manager
               </div>
            </div>
          ) 
         }   

        <div ref={popupToggle} className={styles.Popup}>
           You are not Authorized!
        </div>
         <Outlet/>
      </div>
    </div>

  );
}

export default AdminPortal;
