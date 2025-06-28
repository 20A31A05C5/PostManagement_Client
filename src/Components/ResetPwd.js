import React, { useRef, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function ResetPwd() {
   let ir=useRef()
   let navigate=useNavigate()
   let [msg,setMsg]=useState("")
   const baseUrl = process.env.REACT_APP_API_URL?.replace(/\/+$/, '');
   let sendotp=()=>{
    axios.get(`${baseUrl}/getotp/${ir.current.value}`).then((res)=>{
        if(res.data.msg=="otp sent"){
            navigate(`/updpwd/${ir.current.value}`)
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
            <input type='text' placeholder='Enter Email' ref={ir} ></input>
            <button  className="otp" onClick={sendotp}>Send Otp</button>
        </div>
    </div>
  )
}

export default ResetPwd
