import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Reg() {
  let [data,setData]=useState({"_id":"","name":"","pwd":""})
  let [msg,setMsg]=useState("")
  let navigate=useNavigate()
  const baseUrl = process.env.REACT_APP_API_URL?.replace(/\/+$/, '');
  let fun=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  let reg=()=>{
    axios.post(`${baseUrl}/reg`,data).then((res)=>{
      setMsg(res.data.msg)
      setData({"_id":"","name":"","pwd":""})
      navigate("/login")
    })
  }
  return (
    <div className='regcon'>
      <div className='reg'>
        <div className='error'>{msg}</div>
        <input type='text' placeholder='Enter Email' name='_id' value={data._id} onChange={fun} />
        <input type='text' placeholder='Enter Name ' name='name' value={data.name} onChange={fun} />
        <input type='text' placeholder='Enter Password' name='pwd' value={data.pwd} onChange={fun}/>
        <button onClick={reg}>Register</button>
      </div>
    </div>
  )
}

export default Reg
