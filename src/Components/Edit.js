import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

function Edit() {
  let [data,setData]=useState({"title":"","desc":"","cat":""})
  let [msg,setMsg]=useState("")
  const baseUrl = process.env.REACT_APP_API_URL?.replace(/\/+$/, '');
  let {pid}=useParams()
  console.log(pid)
  let navigate=useNavigate()
  let fun=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  useEffect(()=>{
      axios.get(`${baseUrl}/getpost/${pid}`).then((res)=>{
        setData(res.data)
        console.log(res.data);
        
      })
  },[])
  let upd=()=>{
    axios.put(`${baseUrl}/update`,data).then((res)=>{
      navigate("/pdm")
    }).catch((error)=>{
      setMsg(error.error)
    })
  }
  return (
    <div className='postcon'>
      <div className='post'>
        <div>{msg}</div>
        <input type='text' placeholder='Enter Title' name='title' value={data.title} onChange={fun}/>
        <input type='text' placeholder='Enter Description' value={data.desc} name='desc' onChange={fun} ></input>
        <select name='cat' value={data.cat} onChange={fun}>
          <option value="" selected disabled>--Select Category--</option>
          <option value="news">News</option>
          <option value="sports">Sports</option>
          <option value="others">Others</option>
        </select>
        <button onClick={upd}>Update</button>
      </div>
    </div>
  )
}

export default Edit
