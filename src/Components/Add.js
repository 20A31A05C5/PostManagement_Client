import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Add(){
  let [data,setData]=useState({"title":"","desc":"","cat":""})
  let [ck,setCk]=useState({"uid":"","name":""})
  let [msg,setMsg]=useState("")
  let navigate=useNavigate()

  let fun=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  useEffect(()=>{
    let t=Cookies.get("lgc")
    if(t!==undefined){
      setCk({...ck,...JSON.parse(t)})
    }
    else{
      navigate("/login")
    }
  },[])
  let add=()=>{
       if(data.name=="" || data.title==="" || data.cat==""){
         setMsg("Please All Details...")
       }
       else{
            axios.post(`${process.env.REACT_APP_API_URL}/addpost`,{...data,"uid":ck.uid,"name":ck.name}).then((res)=>{
            setData({"title":"","desc":"","cat":""})
            setMsg(res.data.msg)
            console.log(res.data.msg);
            
          })
       }
          
  }

  /*,
            {"headers":{"authorization":ck.token,"uid":ck.uid}}
  */
  
  return (
    <div className='postcon'>
      <div className='post'>
        <div>{msg}</div>
        <input type='text' placeholder='Enter Title'  name='title' value={data.title} onChange={fun}></input>
        <input type='text' placeholder='Enter Description' name='desc' value={data.desc} onChange={fun} />
        <select name='cat' value={data.cat} onChange={fun}>
          <option selected disabled value="">--Select Category--</option>
          <option value="news">News</option>
          <option value="sports">Sports</option>
          <option value="others">Others</option>
        </select>
        <button onClick={add} >Post</button>
        </div>
    </div>
  )
}

export default Add