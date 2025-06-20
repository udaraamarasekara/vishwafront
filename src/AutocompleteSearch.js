import styles from './AutocompleteSearch.module.css';
import Api from './Api';
import { useNavigate } from 'react-router-dom';
import React, { useState ,useRef} from 'react';
function AutocompleteSearch({url,elementClick,placeholderValue='Search',value,setValue})
{
let time ;
const clicked=useRef(false);
const active = useRef();
const [suggessions,setSuggessions] =useState([]);
const navigate=useNavigate();
const [sugessionBox,setSuggessionBox]=useState(false);
document.onclick=(e)=>{
  if(clicked.current && !clicked.current.contains(e.target)){
   setSuggessionBox(false);
  }
  }


const sendToServer= async (e)=>{
  if( e.target.value && document.activeElement == active.current ){  setSuggessionBox(true); 
  await Api.get('api/'+url+'/'+e.target.value).then((res)=>{
   res.data.data? setSuggessions(res.data.data):setSuggessions(res.data);
 }).catch((e)=>{
  localStorage.getItem('auth') && localStorage.removeItem('auth');
  navigate('/login');
 })
  }else
  {
    setSuggessionBox(false);
  }
}

const elementClicked=(el)=>{
 setSuggessionBox(false);
 elementClick(el);
}
 const updateSuggessions =async (e)=>{ 
      time && clearTimeout(time);
      time  = setTimeout(()=>sendToServer(e), 2000);

 }
 return(  
 <div ref={clicked}>         
   <input type="text" ref={active} onKeyUp={(e)=>updateSuggessions(e)} onChange={setValue} value={value||''}  placeholder={placeholderValue} className={styles.Input}/>
   {
     sugessionBox && 
    <div className={styles.Parent} >         
      <div className={styles.SuggessionArea}>
       {Array.isArray(suggessions)  && suggessions.length!==0 && suggessions.map((element,i) => {
         return (<div key={i} className={styles.SuggesionItem} onClick={()=>elementClicked(element)}>
          { Object.entries(element).filter(([key,value])=>{return  key!=='id' }).map(([j,value])=>{
           return <div key={j}  className={styles.singleDivSuggesion} >{value}</div>;
          })
              
          }
          
        </div>);
       })
       
       }
      </div>
     </div>
     
   }
 </div>
 );
}

export default AutocompleteSearch;