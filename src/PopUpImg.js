import React from "react";
import styles from "./PopUpOne.module.css";
import Url from "./Url";
function PopUpImg({img,setView }){

    return (
       <div className={styles.Expand}>
            <div style={{margin:'auto',background:'white', paddingInline:'auto', width:'500px',height:'auto'}}>
               
                <img src={Url+"storage/uploads/"+img}/>
                 <div onClick={()=>setView()} className={styles.Cancel}>
                     Cancel
                   </div>
            </div>
            
       </div> 
    );
}
export default PopUpImg