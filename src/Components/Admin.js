import React, { useContext, useEffect, useRef, useState } from 'react'
import Cookies from 'js-cookie'
import Ct from './Ct'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Admin() {
  let [data,setData]=useState([])
  let obj=useContext(Ct)
  let navigate=useNavigate()
  let [f,setF]=useState(true)
  let [msg,setMsg]=useState({})
  useEffect(()=>{
    let x=Cookies.get("lgc")
    if(x!==undefined){
        // x=JSON.parse(x)
        // obj.updStore(x)
        axios.get("http://localhost:5000/admin").then((res)=>{ 
            setData(res.data)
        })
    }
    else{ 
        navigate("/login")
    }
  },[f])
  let inspect=(pid)=>{
    axios.put("http://localhost:5000/inspect",{"_id":pid,"comm":msg[pid]}).then(()=>{
      setF(!f)
      setMsg({...msg,[pid]:""})
    })
  }
  let accept=(pid)=>{
    axios.put(`http://localhost:5000/accept/${pid}`).then(()=>{
      setF(!f)
    })
  }
   let toTitleCase=(str)=>{
  return str
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
  return (
    <div className='con'>
      {
        data.map((post)=>{
          return(
            <div className='card'>
              <h1>{post.title}</h1>
              <p>{toTitleCase(post.desc)}</p>
              <div>
                <p>{toTitleCase(post.name)}</p>
                <p>{new Date(post.date).toLocaleDateString()}</p>
                <p>{toTitleCase(post.cat)}</p>
                {post.comm!==undefined && <p>Comment : {toTitleCase(post.comm)}</p>}
                <p>Status : {toTitleCase(post.status)}</p>
               
              </div>
               {post.status==="pending" &&
                <div>
                  <input type="text" value={msg[post._id]} placeholder='Provide Description'
                  onChange={(e)=>setMsg({...msg,[post._id]:e.target.value})} ></input>
                  <button onClick={()=>inspect(post._id)}>Inspect</button>
                  <button onClick={()=>accept(post._id)}>Accept</button>
                </div>
                }
            </div>
          )
        })
      }
        
    </div>
  )
}

export default Admin