import React from "react";
import styles from "./PopUpOne.module.css";
function PopUpOne({cancel,confirm}){

    return (
       <div className={styles.Expand}>
            <div className={styles.Parent}>
                <div className={styles.Topic}>
                   Are You sure?
                </div>
                <div className={styles.ButtonsArea}>
                   <div onClick={()=>confirm()} className={styles.BookNow}>
                      YES
                   </div>
                   <div onClick={()=>cancel()} className={styles.Cancel}>
                     Cancel
                   </div>
                </div>
            </div>
       </div> 
    );
}

export default PopUpOne;