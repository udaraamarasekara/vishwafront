import React, { useEffect, useState,useRef } from "react";
import styles from "./NewGoodAndPerson.module.css";
import AutocompleteSearch from "./AutocompleteSearch";
import { useLocation, useNavigate,useLoaderData } from "react-router-dom";
import  * as All  from './requests';   
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight,faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import CustomSelect from "./CustomSelect";
import Api from "./Api";
import CameraUpload from "./FileInput";
function NewGood(){
  const projects=useRef(useLoaderData());
  const [itemCode,setItemCode] =useState();
  const [description,setDescription] =useState();
  const [brand,setBrand] =useState();
  const [modal,setModal] =useState();
  const [category,setCategory] =useState();
  const [stockNumber,setStockNumber] =useState();
  const [unit,setUnit] =useState();
  const [quantity,setQuantity] =useState();
  const [salePricePerUnit,setSalePricePerUnit] =useState();
  const [topic ,setTopic]=useState();
  const [page,setPage]=useState(1);
  const [tot,setTot]=useState(0);
  const [items,setItems]=useState([]);
  const location =useLocation();
  const [paginatedItems,setPaginatedItems]=useState([]);
  const page_number=useRef(1);
  const [lastPage,setLastPage]=useState();
  const [project,setProject]=useState();
  const popupToggle=useRef();
  const popupTwoToggle=useRef();
  const [img,setImg]=useState();

  const [data,setData]=useState(0);
  let resp=false;
  const nav=useNavigate();
  useEffect(()=>{
   if(location.pathname==='/newGrn'){ setTopic('New Stock Received'); }else{
        
    Array.isArray(projects.current.data) && projects.current.data.length!=='0' &&
      setData(projects.current.data.map((element)=>{ return element.name}));
     setProject(projects.current.data[0]?.name || null);
    setTopic('New Sale');};
  },[location])



  
  const move=(direction)=> {
    if(direction==='next'){
      page_number.current < lastPage && page_number.current++;

    }
    else{
      page_number.current > 1 && page_number.current--;
    }
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    setPaginatedItems(items.slice((page_number.current - 1) * 5, page_number.current * 5));

  }


  const removeItem=(key)=>{
    setItems(items => {
      const newItems = [...items]; // Create a copy of the original array
      newItems.splice(key, 1); // Remove the item at index 'key'
      return newItems; // Return the new array
  });
  }

  const showPopup=()=>{
    popupToggle.current.style.display="block";
    setTimeout(()=>popupToggle.current.style.display="none", 1200);
    }
    const showPopupTwo=()=>{
      popupTwoToggle.current.style.display="block";
      setTimeout(()=>popupTwoToggle.current.style.display="none", 1200);
      clearStates();
      topic!=='New Sale' && setElements('back');
    }
    
   const clearStates = ()=>{
    setBrand('')
    setCategory('')
    setModal('')
    setDescription('')
    setItemCode('')
    setStockNumber('')
    setUnit('')
    setQuantity('')
    setSalePricePerUnit('')
    setTot('')
    setImg(null)
    setItems([])
    setPaginatedItems([])
   }
 
  const calTot=()=>{
    let total=0;
    items.forEach((singleItem)=>{
      total+=singleItem.sale_price_per_unit*singleItem.quantity;
    });
    setTot(total);
  }
  useEffect(() => {
    calTot();
    setLastPage(Math.ceil(items.length/5));
    move('next');
    
  }, [items]); 
  const completeDeal =async(e)=>{
        e.target.disabled = true
       if(Array.isArray(items) && items.length!=='0' ) 
        topic==='New Sale' ? resp =  await  All.newSale({data:items,payment:{amount:tot}}):
        resp =  await  All.newGrn({data:items,payment:{amount:tot}});
       
       if(typeof(resp)==='boolean')
        {
         resp && showPopupTwo()
        } 
        else{  
        resp &&  !('error' in resp) ? showPopupTwo():showPopup();
        }
                e.target.disabled = false
  }

   const addItem=async()=>{
   if(topic==='New Sale')
   {
    if(description && quantity)
      {  
    await Api.get('api/getGoodFromDescription/'+description).then((res)=>{
     if(res)
     {
      let newValue={
        item_code:res.data.data.item_code,
        description:res.data.data.description,
        brand_id:res.data.data.brand_id,
        modal_id:res.data.data.modal_id,
        category_id:res.data.data.category_id,
        unit:res.data.data.unit,
        quantity:quantity,
        sale_price_per_unit:res.data.data.sale_price_per_unit,
        stock_number:res.data.data.stock_number,
        job_number:'-1',
      }
      setItems(items => [...items,newValue]);
     }
     else{
      showPopup();

     }
    
  }).catch((e)=>{alert(e)
   localStorage.getItem('auth') && localStorage.removeItem('auth');
   nav('/login');
  })
    
     
     
      
    }else{
      showPopup();

    }
  }else{
      if(itemCode && description && brand && modal && category  && unit && quantity && salePricePerUnit)
      {
        let newValue={
          item_code:itemCode,
          description:description,
          brand:brand,
          modal:modal,
          category:category,
          unit:unit,
          quantity:quantity,
          sale_price_per_unit:salePricePerUnit,
          stock_number:stockNumber,
          img:img,
          job_number:'-1'
        };
        setItems(items => [...items,newValue]);
      }
      else{
        showPopup();
      } 
    }
   }



   const setElements=(direction)=>{

    if(direction==='next')
    {
      page === 1 ? setPage(2):addItem();
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
        {topic}
      </div>
      <div className={styles.Parent} >
    
      <div className={styles.CardSplitter}> 
          <div className={styles.Card} > 
            <div className={styles.Heading}>New Item</div>
            {page===1 ?

              topic !== 'New Sale' ?
                <div className={styles.Grid} >  
              <AutocompleteSearch key={'itemCode'} url={'newGoodSearch/item_code'} placeholderValue="Part Number" value={itemCode}  setValue={(e)=>setItemCode(e.target.value)} elementClick={(e)=>{setItemCode(e.item_code)}}/>
              <AutocompleteSearch key={'description'} url={'newGoodSearch/description'} placeholderValue="Part Name" value={description}   setValue={(e)=>setDescription(e.target.value)} elementClick={(e)=>{setDescription(e.description)}}/>
              <AutocompleteSearch url={'newGoodSearch/brand'} placeholderValue="Brand" value={brand}   setValue={(e)=>setBrand(e.target.value)} elementClick={(e)=>{setBrand(e.name)}}/>
              <AutocompleteSearch url={'newGoodSearch/modal'} placeholderValue="Modal" value={modal}   setValue={(e)=>setModal(e.target.value)} elementClick={(e)=>{setModal(e.name)}}/>
              <AutocompleteSearch url={'newGoodSearch/category'} placeholderValue="Category" value={category}   setValue={(e)=>setCategory(e.target.value)} elementClick={(e)=>{setCategory(e.name)}}/>
              <input type="text" step="1" min="0" className={styles.Input} placeholder="stock Number" onChange={(e)=>setStockNumber(e.target.value)}  value={stockNumber || ''}/>
              </div>:
              <div className={styles.Grid} >
                
                <AutocompleteSearch key={'description'} url={'newGoodSearch/description'} placeholderValue="Part Name" value={description}   setValue={(e)=>setDescription(e.target.value)} elementClick={(e)=>{setDescription(e.description)}}/>
                <input type="number" step="1" min="0" className={styles.Input} placeholder="Quantity" onChange={(e)=>setQuantity(e.target.value)} value={quantity||''}/>
              </div>
            :
            <div className={styles.Grid} >
              <input type="number" step="1" min="0" className={styles.Input} placeholder="Quantity" onChange={(e)=>setQuantity(e.target.value)} value={quantity||''}/>
              <input type="number" step="any" min="0" className={styles.Input} onChange={(e)=>setSalePricePerUnit(e.target.value)} placeholder="Sale price per unit" value={salePricePerUnit||''}/>
              <AutocompleteSearch key={'unit'}  url={'newGoodSearch/unit'} placeholderValue="Location" setValue={(e)=>setUnit(e.target.value)}  value={unit}  elementClick={(e)=>setUnit(e.unit)}/>
             { topic!=='New Sale' &&  <div  >                
                      <CameraUpload upload={(file)=>{setImg(file)}}/>

                  </div>  }
         </div>
            }
            <div className={styles.ButtonsArea}>
              <div onClick={()=>setElements('back')} className={styles.Button}>
                    Back
              </div>
              <div onClick={()=>{topic==='New Sale'? addItem():setElements('next')}} className={styles.Button}>
                  {page===2 || topic ==='New Sale' ? 'Add':'Next'} 
              </div>
            </div>
          </div> 
        </div>
        <div className={styles.Card}>
          <div className={styles.Heading}>
            Item List
          </div>
          <ul>
            {
              Array.isArray(paginatedItems) && paginatedItems.length!=='0' &&
              paginatedItems.map((item)=>{
              return <li  key={items.indexOf(item)} ><span className={styles.ListItem}>{item.item_code+'-'+item.description+':'+item.quantity+item.unit}<div onClick={(item)=>{removeItem(items.indexOf(item))}} className={styles.RemoveSelected} >-</div></span></li>
              })
            }
          </ul>
          <div className={styles.ArrowSection}>
            <div onClick={()=>move('prev')} className={styles.Arrow} > <FontAwesomeIcon   icon={faAngleDoubleLeft}></FontAwesomeIcon>  </div>
              <div  onClick={()=>move('next')} className={styles.Arrow}> <FontAwesomeIcon   icon={faAngleDoubleRight}></FontAwesomeIcon>  </div>
          </div>
          <h3>Total amount:{' '+tot}</h3>


          <div className={styles.GreenButtonContainer}>
            <button onClick={(e)=>completeDeal(e)} className={styles.GreenButton}>
                Confirm Deal
            </button>
          </div>
        
        </div>
      </div> 
  </div> 
);
}

export default NewGood;