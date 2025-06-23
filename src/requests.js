import Api from './Api';




export const goodsCount =async ()=>{
    let response;
     await  Api.get('api/goodsCount').then((res)=>{
      res.status===500 ? response={error:res.data}:
       response=res.data;
     }).catch((error)=> {
      response={error:error};
      sessionStorage.removeItem('auth');
     })
     return response;
}


export const logOut =async ()=>{
  let response;
   await  Api.post('api/logout').then((res)=>{
    res.status===500 ? response={error:res.data}:
    response={success:res.data};
     }).catch((error)=> {
    response={error:error};
   })
   console.log(response);
   sessionStorage.removeItem('auth');
}

export const singleItem =async (params)=>{
  let response;
   await  Api.get('api/singleItem/'+params.params.obj+'/'+params.params.id).then((res)=>{
    res.status===500 ? response={error:res.data.data}:
    response=res.data.data;
   }).catch((error)=> {
    sessionStorage.removeItem('auth');
    response={error:error};
   })
  return {'type':params.params.obj,'response': response};
}

export const productTransactions=async()=>{
  let response;
   await  Api.get('api/productTransactionCount').then((res)=>{
    res.status===500 ? response={error:res.data}:
    response=res.data;   }).catch((error)=> {
    sessionStorage.removeItem('auth');
    response={error:error};
   })
  return response;
 
}

export const allGoods=async()=>{
  let response;
   await  Api.get('api/good').then((res)=>{
    res.status===500 ? response={error:res.data}:
    response=res.data;   }).catch((error)=> {
    sessionStorage.removeItem('auth');
    response={error:error};
   })
  return response;
}
export const testRequest =async()=>{
  let response;
  sessionStorage.setItem('loginPage',false); 
  await  Api.get('api/test').then((res)=>{
    res.status===500 ? response={error:res.data}:
    response=res.data;  }).catch((error)=> {
   sessionStorage.removeItem('auth');
   response={error:error};
  })
  if(response===1){
    sessionStorage.setItem('auth',true);
  }
 return response;
}

export const allGoodsPaginate=async(link)=>{
  let response;
   await  Api.get('api/good'+link).then((res)=>{
    res.status===500 ? response={error:res.data}:
    response=res.data;   }).catch((error)=> {
    sessionStorage.removeItem('auth');
    response={error:error};
   })
  return response;
}


export const allTimeGrns=async()=>{
  let response;
   await  Api.get('api/allTimeGrns').then((res)=>{
    res.status===500 ? response={error:res.data}:
    response=res.data;   }).catch((error)=> {
    sessionStorage.removeItem('auth');
    response={error:error};
   })
  return response;
}

export const allTimeGrnsPaginate=async(link)=>{
  let response;
   await  Api.get('api/allTimeGrns'+link).then((res)=>{
    res.status===500 ? response={error:res.data}:
    response=res.data;   }).catch((error)=> {
    sessionStorage.removeItem('auth');
    response={error:error};
   })
  return response;
}
export const allTimeSales=async()=>{
  let response;
   await  Api.get('api/allTimeSales').then((res)=>{
    res.status===500 ? response={error:res.data}:
    response=res.data;   }).catch((error)=> {
    sessionStorage.removeItem('auth');
    response={error:error};
   })
  return response;
}

export const allTimeSalesPaginate=async(link)=>{
  let response;
   await  Api.get('api/allTimeSales'+link).then((res)=>{
    res.status===500 ? response={error:res.data}:
    response=res.data;   }).catch((error)=> {
    sessionStorage.removeItem('auth');
    response={error:error};
   })
  return response;
}

export const peopleData=async()=>{
  let response;
   await  Api.get('api/peopleData').then((res)=>{
    res.status===500 ? response={error:res.data.data}:
    response=res.data.data;   }).catch((error)=> {
    sessionStorage.removeItem('auth');
    response={error:error};
   })
  return response;
}

export const getProfessions=async()=>{
  let response;
   await  Api.get('api/getProfessions').then((res)=>{
    res.status===500 ? response={error:res.data.data}:
    response=res.data.data;  }).catch((error)=> {
    sessionStorage.removeItem('auth');
    response={error:error};
   })
  return response;
}




export const allGoodsWithTime=async(from,to)=>{
  let response;
   await  Api.get('api/allGoodsWithinPeriod?to='+to+'&from='+from).then((res)=>{
    res.status===500 ? response={error:res.data}:
    response=res.data;   }).catch((error)=> {
    sessionStorage.removeItem('auth');
    response={error:error};
   })
  return response;
}

export const allGoodsWithTimePaginate=async(page,from,to)=>{
  let response;
   await  Api.get('api/allGoodsWithinPeriod'+page+'&to='+to+'&from='+from).then((res)=>{
    res.status===500 ? response={error:res.data}:
    response=res.data;   }).catch((error)=> {
    sessionStorage.removeItem('auth');
    response={error:error};
   })
  return response;
}

export const allSales=async(from,to)=>{
  let response;
   await  Api.get('api/sales?to='+to+'&from='+from).then((res)=>{
    res.status===500 ? response={error:res.data}:
    response=res.data;   }).catch((error)=> {
    sessionStorage.removeItem('auth');
    response={error:error};
   })
  return response;
}

export const allSalesPaginate=async(page,from,to)=>{
  let response;
   await  Api.get('api/sales'+page+'&to='+to+'&from='+from).then((res)=>{
    res.status===500 ? response={error:res.data}:
    response=res.data;   }).catch((error)=> {
    sessionStorage.removeItem('auth');
    response={error:error};
   })
  return response;
}

export const allGrns=async(from,to)=>{
  let response;
   await  Api.get('api/grns?to='+to+'&from='+from).then((res)=>{
    res.status===500 ? response={error:res.data}:
    response=res.data;   }).catch((error)=> {
    sessionStorage.removeItem('auth');
    response={error:error};
   })
  return response;
}
export const allGrnsPaginate=async(page,from,to)=>{
  let response;
   await  Api.get('api/grns'+page+'&to='+to+'&from='+from).then((res)=>{
    res.status===500 ? response={error:res.data}:
    response=res.data ;   }).catch((error)=> {
    sessionStorage.removeItem('auth');
    response={error:error};
   })
  return response;
}

export const newGrn=async(data)=>{
  let response;
  if(sessionStorage.getItem('role')==='admin'||  JSON.parse(sessionStorage.getItem('ability')).find((obj => obj.table === 'good' && obj.method === 'create')))
  {
   await  Api.post('api/newGrn',data,

    {
    headers: {
      'Content-Type': 'multipart/form-data', // Only set here for this request
    },
  }
   ).then((res)=>{
    res.status===500 ? response={error:res.data}:
    response=true;
   }).catch((error)=> {
    sessionStorage.removeItem('auth');
    response={error:error};
   })
  }
  return response;
}

export const newSale=async(data)=>{
  let response;
  if(sessionStorage.getItem('role')==='admin'||  JSON.parse(sessionStorage.getItem('ability')).find((obj => obj.table === 'good' && obj.method === 'create')))
  {
   await  Api.post('api/newSale',data).then((res)=>{
    res.status===500 ? response={error:res.data}:
    response=true;
   }).catch((error)=> {
    sessionStorage.removeItem('auth');
    response={error:error};
   })
  }
  return response;
}

export const newProfession=async(data)=>{
  let response;
  if(sessionStorage.getItem('role')==='admin'|| JSON.parse(sessionStorage.getItem('ability'))?.find(obj => obj.table === 'profession' && obj.method === 'create'))
  {
   await  Api.post('api/profession',data).then((res)=>{
    res.status===500 ? response={error:res.data}:
    response=true;
  }).catch((error)=> {
    sessionStorage.removeItem('auth');
    response={error:error};
   })
  }
  return response;
}
export const newPerson=async(data)=>{
  let response;
  if(sessionStorage.getItem('role')==='admin'|| JSON.parse(sessionStorage.getItem('ability'))?.find(obj => obj.table === 'user' && obj.method === 'create'))
  {
   await  Api.post('api/admin',data).then((res)=>{
    response=true;
  }).catch((error)=> {
    sessionStorage.removeItem('auth');
    response={error:error};
   })
  }  
  return response;
}
export const getProjects=async()=>{
  let response;
   await  Api.get('api/getProjects').then((res)=>{
    res.status===500 ? response={error:res.data}:
    response=res.data;   }).catch((error)=> {
    sessionStorage.removeItem('auth');
    response={error:error};
   })
  return response;
}

export const newProject=async(data)=>{
  let response;
  if(sessionStorage.getItem('role')==='admin'|| JSON.parse(sessionStorage.getItem('ability'))?.find(obj => obj.table === 'project' && obj.method === 'create'))
  {
   await  Api.post('api/newProject',data).then((res)=>{
    res.status===500 ? response={error:res.data}:
    response=true;  }).catch((error)=> {
    sessionStorage.removeItem('auth');
    response={error:error};
   })
  }
  return response;
}


export const editGood=async(id,data)=>{
  let response;
  if(sessionStorage.getItem('role')==='admin'|| JSON.parse(sessionStorage.getItem('ability'))?.find(obj => obj.table === 'good' && obj.method === 'create'))
  {
    await  Api.put('api/good/'+id,data).then((res)=>{
      res.status===500 ? response={error:res.data}:
      response=true;  }).catch((error)=> {
      sessionStorage.removeItem('auth');
      response={error:error};
     })
  }

  return response;
}

export const deleteGood=async(id)=>{
  let response;
 
    await  Api.delete('api/good/'+id).then((res)=>{
      res.status===500 ? response={error:res.data}:
      response=true;    }).catch((error)=> {
      sessionStorage.removeItem('auth');
      response={error:error};
     })

  return response;
}
