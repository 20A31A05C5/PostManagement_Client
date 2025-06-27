import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom' 
import Nav from './Components/Nav'
import Home from './Components/Home';
import All from './Components/All'
import Sports from './Components/Sports'
import News from './Components/News'
import Other from './Components/Other'
import Pdm from './Components/Pdm'
import Add from './Components/Add';
import Edit from './Components/Edit';
import Reg from './Components/Reg'
import Login from './Components/Login';
import Logout from './Components/Logout';
import Ct from './Components/Ct'
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie'
import Admin from './Components/Admin';
import UpdPwd from './Components/UpdPwd';
import ResetPwd from './Components/ResetPwd';




const App=()=>{
  let [store,setStore]=useState({"token":"","name":"","uid":"","role":""})
  let updStore=(obj)=>{
    setStore({...store,...obj})
  }
  let obj={"store":store,"updStore":updStore}
  useEffect(()=>{
    let x=Cookies.get("lgc")
    if(x!==undefined){
      updStore(JSON.parse(x))
    }
  },[])
  return (
   <BrowserRouter>
   <Ct.Provider value={obj}>
   <Nav/>
    <Routes>
      <Route path='/' element={<Home/>}>
      <Route path='/' element={<All/>}></Route>
      <Route path='/news' element={<News/>}></Route>
      <Route path='/sports' element={<Sports/>}></Route>
      <Route path='/others' element={<Other/>}></Route>
      <Route path='/pdm' element={<Pdm/>}></Route>
      </Route>
      <Route path='/logout' element={<Logout/>} />
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/reg' element={<Reg/>}/>
      <Route path='/edit/:pid' element={<Edit/>} />
      <Route path='/add' element={<Add/>} />
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/resetpwd' element={<ResetPwd/>} />
      <Route path="/updpwd/:uid"  element={<UpdPwd/>}/>
    </Routes>
    </Ct.Provider>
   </BrowserRouter>
  );
}

export default App;
