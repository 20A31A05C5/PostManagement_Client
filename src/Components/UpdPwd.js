import React, { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

function UpdPwd() {
    let [data,setData]=useState({"pwd":"","otp":""})
  let {uid}=useParams()
  let navigate=useNavigate()
    const baseUrl = process.env.REACT_APP_API_URL?.replace(/\/+$/, '');
  let [msg,setMsg]=useState("")
  let fun=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  let reset=()=>{
    axios.put(`${baseUrl}/updpwd`,{...data,"uid":uid}).then((res)=>{
        if(res.data.msg==="Password Reset Done"){
            navigate("/login")
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
           <input type='text' placeholder='Enter Otp ' value={data.otp} name="otp" onChange={fun} required ></input>
           <input type='text' placeholder='Enter Password' value={data.pwd} name='pwd' onChange={fun} required></input>
           <button onClick={reset}>Reset Password</button>
        </div>
    </div>
  )
}

export default UpdPwd
