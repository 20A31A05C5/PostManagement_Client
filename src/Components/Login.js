import React, { useContext, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import Ct from './Ct'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  let [data,setData]=useState({"_id":"","pwd":""})
  const baseUrl = process.env.REACT_APP_API_URL?.replace(/\/+$/, '');
  let [msg,setMsg]=useState("")
  let obj=useContext(Ct)
  let navigate=useNavigate()
  let fun=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  let login=()=>{
    axios.post(`${baseUrl}/login`,data).then((res)=>{
      if(res.data.token!==undefined){
        Cookies.set("lgc",JSON.stringify(res.data),{"expires":2})
        obj.updStore(res.data)
        navigate("/")
      }
      else{
        setMsg(res.data.msg)
      }
      
    })
  }
  return (
    <div className='logcon'>
      
      <div className='login'>
      <div>{msg}</div>
      <input type="text" placeholder='Enter Email' name="_id" value={data._id} onChange={fun} ></input>
      <input type='text' placeholder='Enter Password' name='pwd' value={data.pwd} onChange={fun} />
      <button onClick={login}>Login</button>
      <Link to="/resetpwd">Forgot Password..?</Link>
      </div>
     
    </div>
  )
}

export default Login
