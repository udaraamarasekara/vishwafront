import styles from './SingleDataObject.module.css';
import { useLoaderData } from 'react-router-dom';
import React, { useRef } from 'react';
import Loading from './Loading';
import noImg from './noImg.png';
import axios from 'axios';
import Url from './Url';
function SingleDataObject(){
  async function downloadDocument() {
    axios({
      url:  Url+`api/getCurrentStock`,
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

    const data =useLoaderData();
    const viewImg=useRef(false);  
    const viewOnLoad=useRef(false);  

    const errorOccured=()=>{
      viewImg.current= false;
      viewOnLoad.current=false;
    }
    const loading=()=>{
      viewImg.current= false;
      viewOnLoad.current=true;
    }
    const completed=()=>
    {
      viewImg.current= true;
      viewOnLoad.current=false;
      console.log(data);
    }
return(
  <div className={styles.Parent}>
    <div className={styles.DataRow} >
      <div className={styles.DataArea}>
         <div className={styles.Heading}>
            {data.response.name}  -  {data.type}
        </div>
        {Object.entries(data.response).filter(([key,value])=>{return key!=='id' } ).map(([key,value])=>{
          return <div key={key} className={styles.RestData}>
               {key} - {value}       
          </div>
        })
       
        }
      </div>
        
        <div className={styles.ImgDiv}>
            { viewImg.current ?
            <img src='' onLoad={loading} onComplete={completed} onError={errorOccured}  alt='Not' /> :
            viewOnLoad.current ?
            <Loading/> 
            :
             <img className={styles.NoImg} alt='f'  src={noImg} />
            }  
  
        </div>
      
    </div>
    <button onClick={downloadDocument} className={styles.SearchButton}>
                Download Pdf
        </button>
  </div>

);

}



export default SingleDataObject;