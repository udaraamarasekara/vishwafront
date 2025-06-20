import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight,faAngleDoubleLeft,faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';
import styles from "./SalesAndReceived.module.css";
import CustomSelect from "./CustomSelect";
import React,{ useRef, useState} from "react";
import { useLoaderData,useNavigate } from "react-router-dom";
import  * as All  from './requests';   
import Loading from './Loading'; 
import CheckedBox from './CheckedBox';
import axios from 'axios';
import PopUpOne from './PopUpOne';
import Url from './Url';

function SalesAndReceived(){
  
  let allData=useRef(useLoaderData());
  const nav=useNavigate();
  const [data,setData]=useState(allData.current.data);
  const [links,setLinks] =useState(allData.current.links);
  const [meta,setMeta] =useState(allData.current.meta);
  const [load,setLoad]=useState(false);
  const [checkStatus,setCheckStatus]=useState(false);
  const [toState,setToState]=useState(false);
  const [fromState,setFromState]=useState(false);
  const [searchType,setSearchType]=useState("All transactions");
  const from =useRef();
  const to= useRef();
  const search= useRef('allGoods');
  let k=0;
  let url;
  const [popUp,setPopUp]=useState(false);
  const id=useRef();
  async function downloadDocument() {
    axios({
      url:  Url+`api/`+url,
      method: "GET",
      responseType: "blob",
      withCredentials: true,
      
      // important
    }).then((response) => {
      // Service that handles ajax call
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", 'test.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  }

  
  const editAccess=sessionStorage.getItem('role')==='admin' || JSON.parse(sessionStorage.getItem('ability'))?.find(obj => obj.table === 'good' && obj.method === 'edit')?true:false ;
  const deleteAccess=sessionStorage.getItem('role')==='admin' || JSON.parse(sessionStorage.getItem('ability'))?.find(obj => obj.table === 'good' && obj.method === 'delete')?true:false;
   const fromChange=()=>{
    if(fromState && from.current.value)
    {
      setFromState(false);
    }
  }

  const toChange=()=>{
    if(toState && to.current.value)
    {
      setToState(false);
    }
  }

const download=()=>{
      if(search.current==='allGoods')
      {
       url='getAllWithoutPaginate';
      }else if(search.current==='allTimeGrns')
      {
        url='allTimeGrnsWithoutPaginate';

      }else if(search.current==='allTimeSales')
      {
        url='allTimeSalesWithoutPaginate';

      }else if(search.current==='allSales')
      {
        url='allSalesWithoutPaginate?to='+to.current.value+'&&from='+from.current.value;

      }
      else if(search.current==='allGrns')
      {
        url='allGrnsWithoutPaginate?to='+to.current.value+'&&from='+from.current.value;
      }
      else if(search.current==='allGoodsWithTime'){
        url='allGoodsWithTimeWithoutPaginate?to='+to.current.value+'&&from='+from.current.value ;

      }

      downloadDocument();
}

const setPopUpAndIid=async(Id)=>{
  id.current=Id;

setPopUp(true);
}
const confirmDelete=async()=>{
  await All.deleteGood(id.current);
  setPopUp(false);
  filterData();
}


  const filterData=async()=>{
    setLoad(true);

    if(checkStatus){
      if(from.current.value)
      {
        if(to.current.value){
           if(searchType==='All transactions')
           {
             allData.current= await All.allGoodsWithTime(from.current.value,to.current.value); 
             search.current='allGoodsWithTime';
           }
           else if(searchType==='Sales')
           {
            allData.current= await All.allSales(from.current.value,to.current.value); 
            search.current='allSales';
           }
           else
           {
            allData.current= await All.allGrns(from.current.value,to.current.value); 
            search.current='allGrns';
           } 
        }
        else{
          setToState(true);

        }
      }
      else{
        setFromState(true);
      }
   
    }
    else{
      if(searchType!=='All transactions')
      {
       if(searchType==='Sales'){
          search.current='allTimeSales';
          allData.current= await All.allTimeSales();
       }else{
        search.current='allTimeGrns';
        allData.current= await All.allTimeGrns();
       }
     
      }else{
        allData.current= await All.allGoods();

      }
   
    }
    setData(allData.current.data);
    setLinks(allData.current.links);
    setMeta(allData.current.meta);
    setLoad(false);

  }



  const shiftQuery=async (argument)=>{
    setLoad(true);
   let tmpLink=links.next;
    if(argument==='next' && meta.current_page!==meta.last_page)
    {
      tmpLink='?page='+ parseInt(parseInt(meta.current_page)+1);

    }else if(argument==='prev' && meta.current_page!=='1')
    {
      tmpLink='?page='+ parseInt(parseInt(meta.current_page)-1);

    }else if(argument==='first')
    {
      tmpLink='?page=1';

    }
    else if(argument==='last')
    {
      tmpLink='?page='+meta.last_page;
    }
     if(tmpLink){
      if(search.current==='allGoods')
      {
      allData.current= await All.allGoodsPaginate(tmpLink);
      }else if(search.current==='allTimeGrns')
      {
        allData.current= await All.allTimeGrnsPaginate(tmpLink);
      }else if(search.current==='allTimeSales')
      {
        allData.current= await All.allTimeSalesPaginate(tmpLink);
      }else if(search.current==='allSales')
      {
        allData.current= await All.allSalesPaginate(tmpLink,from.current.value,to.current.value);
      }
      else if(search.current==='allGrns')
      {
        allData.current= await All.allGrnsPaginate(tmpLink,from.current.value,to.current.value);
      }
      else if(search.current==='allGoodsWithTime' ){
        allData.current= await All.allGoodsWithTimePaginate(tmpLink,from.current.value,to.current.value);
      }
  
     }
     setData(allData.current.data);
     setLinks(allData.current.links);
     setMeta(allData.current.meta);
     setLoad(false);
 }

  return(
  <div>
    {popUp && <PopUpOne cancel={()=>setPopUp(false)} confirm={confirmDelete}/>}
     <div className={styles.SelectionsContainer}>
        <div className={styles.OneThird}>
          <div className={styles.CheckedBox}>
            <CheckedBox text='Custom period' status={checkStatus} setStatus={setCheckStatus} />
          </div> 
        </div> 
        <div className={styles.OneThird}>
              <button onClick={filterData} className={styles.SearchButton}>
                Search
              </button>
        </div>  
        <div className={styles.OneThird}>
              <button onClick={download} className={styles.SearchButton}>
                Download Pdf
              </button>
        </div> 
      </div>   
      <div className={styles.SelectionsContainer}>
         <div className={styles.OneThird}>
            <CustomSelect pos={true} setCurrentVal={setSearchType} optionData={['All transactions','Goods received','Sales']} />
         </div>
        {checkStatus && <>
         <div className={styles.OneThird} >
           <div className={styles.Pack}>
              <label className={styles.lbl} >From</label>  
              <div className={styles.InputWrapper} >
                <input ref={from} onChange={fromChange} className={styles.Input} type="datetime-local"/>
                {fromState &&
                <label className={styles.ErrorLbl} >Fill this field</label>  
                }
              </div>  
           </div>  
         </div>
         <div className={styles.OneThird} >
          <div className={styles.Pack}>
              <label className={styles.lbl}>To</label> 
              <div className={styles.InputWrapper} >
                <input ref={to} onChange={toChange} className={styles.Input} type="datetime-local"/>
                {
                toState && 
                <label className={styles.ErrorLbl} >Fill this field</label>  
                }  
              </div>  
            </div> 
         </div>
         </>    
          } 
       </div>

      {
       load && <Loading/>
      } 
      
       <div className={styles.TableContainer}>
         { Array.isArray(data) && data.length ? 
           <table   cellSpacing="0" cellPadding="0" className={styles.TableStyle}>
            <thead>
            <tr>
             {
              Object.keys(data[0]).filter((key)=>{return key!=='id'}).map((key)=>{
               return(
                
                  <th key={key} className={styles.TableHeader} >
                    {key.replaceAll("_"," ").toUpperCase()}
                  </th>
                );
              })
             }
             {(editAccess || deleteAccess) &&
               <th className={styles.TableHeader}>  Actions </th>
             }
            </tr>
            </thead>
            <tbody>
            {
             data.map(element => {
              k++;
              return(
              <tr key={k} className={styles.TableRow} >
                {Object.entries(element).filter(([key,val])=>{return key!=='id' }).map(([key,val])=>{
         
                 return(<td className={styles.DataCell} key={key} >
                  {val}
                 </td> );
                })}
                { (editAccess || deleteAccess) && <td className={styles.DataCellFlex}>
                  {editAccess &&   <div onClick={()=>{nav('/editGood/'+element.id,{state:element})}} className={styles.Yellow}>         <FontAwesomeIcon   icon={faEdit}></FontAwesomeIcon></div>   }
                  {deleteAccess &&   <div className={styles.Red}  onClick={()=>setPopUpAndIid(element.id)} >         <FontAwesomeIcon   icon={faTrash}></FontAwesomeIcon></div>   }

                </td>}
              </tr>);
             }) 
             
            }
            </tbody>
           </table>:
           <div></div>
         } 

          {Array.isArray(data)  && data.length!==0 &&
        
        <div>
          <div className={styles.ButtonsContainer}>
            <button onClick={()=>shiftQuery('first')} className={styles.Button}> 
               1
             </button>
             <div>....</div>
             <button onClick={()=>shiftQuery('prev')} className={styles.Button}> 
              <FontAwesomeIcon   icon={faAngleDoubleLeft}></FontAwesomeIcon>
             </button>
             <div> Showing {meta.current_page } out of {meta.last_page} </div>
             <button onClick={()=>shiftQuery('next')} className={styles.Button}> 
              <FontAwesomeIcon   icon={faAngleDoubleRight}></FontAwesomeIcon>
             </button>
             <div>....</div>
             <button onClick={()=>shiftQuery('last')}  className={styles.Button}> 
               {meta.last_page}
             </button>
          </div>
       </div>
       }{(!Array.isArray(data) || data.length===0 )&&
        <div className={styles.NoData}>No data to show!</div>
       }
        </div> 
  </div>);
    
}

export default SalesAndReceived;