import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './CustomSelect.module.css';
import React,{ useRef, useState } from 'react';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

function CustomSelect({optionData,setCurrentVal,pos=false}){
const [name,setName]=useState(optionData[0]);
const [SelectActive,setSelectActive]=useState(false);
const [options,setOptions]=useState(styles.options);
const [visible,setVisible]=useState('none');
const [arrowIcon,setArrowIcon]=useState(false);
const clicked=useRef(false);
let i=0;
document.onclick=(e)=>{
if(clicked.current && !clicked.current.contains(e.target)){
  setArrowIcon(false);
  setOptions(styles.fOut);
  setVisible('none');
  window.setTimeout(function () {
    setSelectActive(false);

  // do stuff after animation has finished here
}, 600);
}
}
 
const changeValue=(value)=>
{
    setName(value);
    setCurrentVal(value);

}

const toggle=()=>
{
  document.documentElement.style.setProperty('--optionWidth',clicked.current.offsetWidth*0.86+'px');
    document.documentElement.style.setProperty('--marginLeft',clicked.current.offsetWidth*0.07+'px');

  setArrowIcon(!arrowIcon);
  if(!pos){
    if(SelectActive)
      {
        setOptions(styles.fOutNormal);
        setVisible('none');
        window.setTimeout(function () {
          setSelectActive(false);
    
        // do stuff after animation has finished here
    }, 600);
      }else{
        setOptions(styles.optionsNormal);
        setSelectActive(true);
        window.setTimeout(function () {
          setVisible('block');
    
        // do stuff after animation has finished here
    }, 600);
      }
  }
  else{
  if(SelectActive)
  {
    setOptions(styles.fOut);
    setVisible('none');
    window.setTimeout(function () {
      setSelectActive(false);

    // do stuff after animation has finished here
}, 600);
  }else{
    setOptions(styles.options);
    setSelectActive(true);
    window.setTimeout(function () {
      setVisible('block');

    // do stuff after animation has finished here
}, 600);
  }
  }
}  
return (
<div ref={clicked} className={styles.Parent} onClick={toggle} >
<div className={SelectActive ? (pos? styles.SelectActive:styles.SelectActiveNormal):(pos?styles.Select:styles.SelectNormal)}>
  <div className={styles.SelectedDiv} >{name}</div>
  <FontAwesomeIcon  className={arrowIcon ? styles.TurnedIcon:styles.NormalIcon} icon={faCaretDown}></FontAwesomeIcon>
 
</div>
{SelectActive && 
<div  className={options} >
    { optionData.map(element => {
      
      return(
      <div key={i} className={styles.option}>
        <div style={{display:`${visible}`}} className={styles.optionText} onClick={()=>changeValue(element)} >{element}</div> 
        <div className={styles.Hide} > {i++}</div>
      </div> );  
      
    })
    
    }
</div>
}
<div>
</div>  
</div>
);}

export default CustomSelect;