import React, { useEffect, useState,useRef } from "react";
import styles from "./NewGoodAndPerson.module.css";
import AutocompleteSearch from "./AutocompleteSearch";
import { useLocation, useNavigate,useLoaderData, useParams } from "react-router-dom";
import  * as All  from './requests';   
import CustomSelect from "./CustomSelect";
function EditGood(){
  const projects=useRef(useLoaderData());
  const [itemCode,setItemCode] =useState();
  const [description,setDescription] =useState();
  const [brand,setBrand] =useState();
  const [modal,setModal] =useState();
  const [category,setCategory] =useState();
  const [dealer,setDealer] =useState();
  const [dealerType,setDealerType] =useState();
  const [jobNumber,setJobNumber] =useState();
  const [unit,setUnit] =useState();
  const [quantity,setQuantity] =useState();
  const [salePricePerUnit,setSalePricePerUnit] =useState();
  const [topic ,setTopic]=useState();
  const [page,setPage]=useState(1);
  const location =useLocation();
  const [project,setProject]=useState();
  const popupToggle=useRef();
  const popupTwoToggle=useRef();
  const {id}=useParams();
  const [data,setData]=useState(0);
  const {state}=useLocation();
  let resp=false;
  const nav=useNavigate();

  useEffect(()=>{
   setItemCode(state.name);
   setCategory(state.category);
   setBrand(state.brand);
   setDealer(state.dealer);
   setModal(state.modal);
   setJobNumber(state.job_number);
   setDescription(state.description);
   setUnit(state.unit);
   setQuantity(state.quantity);
   setSalePricePerUnit(state.sale_price_per_unit);
  },[])

  useEffect(()=>{
   if(state.received_or_sold==='Received'){ setTopic('New Stock Received'); setDealerType('supplier')  }else{
        
    Array.isArray(projects.current.data) && projects.current.data.length!=='0' &&
      setData(projects.current.data.map((element)=>{ return element.name}));
     setProject(projects.current.data[0]?.name || null);
      setDealerType('customer');
     setProject(state.project)
  };
  },[location])

  const showPopup=()=>{
    popupToggle.current.style.display="block";
    setTimeout(()=>popupToggle.current.style.display="none", 1200);
    }
   
    const showPopupTwo=()=>{
      popupTwoToggle.current.style.display="block";
      setTimeout(()=>popupTwoToggle.current.style.display="none", 1200);
      }
   const editItem=async()=>{
    let newValue={};
   if(state.received_or_sold==='Sold')
   {   

    if(itemCode && description && brand && modal && category && dealer && unit && quantity && salePricePerUnit && project)
      {
         newValue={
          item_code:itemCode,
          description:description,
          brand:brand,
          modal:modal,
          category:category,
          dealer:dealer,
          unit:unit,
          quantity:quantity,
          sale_price_per_unit:salePricePerUnit,
          job_number:jobNumber,
          project_id:projects.current.data.find(item => item.name === project).id,

        };
      }
      else{
        showPopup();
      } 
      
    }else{

      if(itemCode && description && brand && modal && category && dealer && unit && quantity && salePricePerUnit)
      {
         newValue={
          item_code:itemCode,
          description:description,
          brand:brand,
          modal:modal,
          category:category,
          dealer:dealer,
          unit:unit,
          quantity:quantity,
          sale_price_per_unit:salePricePerUnit,
          job_number:jobNumber,
        };

       resp= await All.editGood(id,newValue);
       if(resp)
       {
        showPopupTwo();
       }
      }
      else{
        showPopup();
      } 
    }
   }



   const setElements=(direction)=>{

    if(direction==='next')
    {
      page === 1 ? setPage(2):editItem();
    }
    else
    {
      page === 2 ? setPage(1):nav(-1);
    }
   }
return(
  <div className={styles.Page}>
     <div ref={popupToggle} className={styles.Popup}>
       Data You entered are not valid!
      </div>
      <div ref={popupTwoToggle} className={styles.PopupTwo}>
        Done!
      </div>
      <div className={styles.Topic}>
        Edit Stock
      </div>
      <div className={styles.Parent} >
    
      <div className={styles.CardSplitter}> 
          <div className={styles.Card} > 
            <div className={styles.Heading}>Edit Item</div>
            {page===1 ?
            <div className={styles.Grid} >
              <AutocompleteSearch key={'itemCode'} url={'newGoodSearch/item_code'} placeholderValue="Item code" value={itemCode}  setValue={(e)=>setItemCode(e.target.value)} elementClick={(e)=>{setItemCode(e.item_code)}}/>
              <AutocompleteSearch key={'description'} url={'newGoodSearch/description'} placeholderValue="Description" value={description}   setValue={(e)=>setDescription(e.target.value)} elementClick={(e)=>{setDescription(e.description)}}/>
              <AutocompleteSearch url={'newGoodSearch/brand'} placeholderValue="Brand" value={brand}   setValue={(e)=>setBrand(e.target.value)} elementClick={(e)=>{setBrand(e.name)}}/>
              <AutocompleteSearch url={'newGoodSearch/modal'} placeholderValue="Modal" value={modal}   setValue={(e)=>setModal(e.target.value)} elementClick={(e)=>{setModal(e.name)}}/>
              <AutocompleteSearch url={'newGoodSearch/category'} placeholderValue="Category" value={category}   setValue={(e)=>setCategory(e.target.value)} elementClick={(e)=>{setCategory(e.name)}}/>
              <AutocompleteSearch url={'newGoodSearch/'+dealerType} placeholderValue={dealerType} value={dealer}   setValue={(e)=>setDealer(e.target.value)} elementClick={(e)=>{setDealer(e.name)}}/>
                </div>
            :
            <div className={styles.Grid} >
              <AutocompleteSearch key={'unit'}  url={'newGoodSearch/unit'} placeholderValue="Unit" setValue={(e)=>setUnit(e.target.value)}  value={unit}  elementClick={(e)=>setUnit(e.unit)}/>
              <input type="number" step="1" min="0" className={styles.Input} placeholder="Quantity" onChange={(e)=>setQuantity(e.target.value)} value={quantity||''}/>
              <input type="number" step="any" min="0" className={styles.Input} onChange={(e)=>setSalePricePerUnit(e.target.value)} placeholder="Sale price per unit" value={salePricePerUnit||''}/>
              <input type="text" step="1" min="0" className={styles.Input} placeholder="Job Number" onChange={(e)=>setJobNumber(e.target.value)}  value={jobNumber || ''}/>
             { topic==='New Sale' &&  <div  >                
                      <CustomSelect setCurrentVal={setProject} optionData={data|| null}/>
                      <div className={styles.KeepSpace}></div>

                  </div>  }
         </div>
            }
            <div className={styles.ButtonsArea}>
              <div onClick={()=>setElements('back')} className={styles.Button}>
                    Back
              </div>
              <div onClick={()=>setElements('next')} className={styles.Button}>
                  {page===2 ?'Edit':'Next'} 
              </div>
            </div>
          </div> 
        </div>
      </div> 
  </div> 
);
}

export default EditGood;