import AdminDashboard from './AdminDashboard';
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import AdminPortal from './AdminPortal';
import Login from './Login';
import  * as All  from './requests';   
import ProtectedRoutes from './ProtectedRoutes';
import React from 'react';
import SingleDataObject from './SingleDataObjectView';
import AdminProductManager from './AdminProductManager';
import SalesAndReceived from './SalesAndReceived';
import NewGood from './NewGood';  
import NewProfession from './NewProfession';
import AdminPeopleManager from './AdminPeopleManager';
import NewPerson from './NewPerson';
import NewProject from './NewProject';
import ProfileManager from './ProfileManager';
import EditGood from './EditGood';
  const routes = createBrowserRouter(
    createRoutesFromElements(
    <>
      <Route path='/' loader={All.testRequest} element={<ProtectedRoutes/>}>
        <Route path='/' element={<AdminPortal/>}>
          <Route loader={All.goodsCount}  index element={<AdminDashboard/>}/>
          <Route loader={(params)=>{ return All.singleItem(params)}} path='/searchResults/:obj/:id'  element={<SingleDataObject/>}/>
          <Route path='/productManager' loader={All.productTransactions} element={<AdminProductManager/>}/>
          <Route path='/salesAndReceived' loader={All.allGoods} element={<SalesAndReceived/>}/>
          <Route path='/newSale' loader={All.getProjects}  element={<NewGood/>}/>
          <Route path='/newGrn'  element={<NewGood/>}/>
          <Route path='/adminPeopleManager' loader={All.peopleData} element={<AdminPeopleManager/>}/>
          <Route path='/newProfession'  element={<NewProfession/>}/>
          <Route path='/newEmployee' loader={All.getProfessions} element={<NewPerson/>}/>
          <Route path='/newCustomer'  element={<NewPerson/>}/>
          <Route path='/newSupplier'  element={<NewPerson/>}/>
          <Route path='/projectManager'  element={<NewProject/>}/>
          <Route path='/profileManager'  element={<ProfileManager/>}/>
          <Route path='/editGood/:id' loader={All.getProjects} element={<EditGood/>}/>
        </Route>  
      </Route>
      <Route path='*' loader={()=>{sessionStorage.setItem('loginPage','true') ;return null;}} element={<Login/>}/>

    </>
    )
  );
    export default routes;