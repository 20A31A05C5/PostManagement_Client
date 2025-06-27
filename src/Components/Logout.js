import React, { useContext, useEffect } from 'react'
import Ct from './Ct'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

function Logout() {
  let obj=useContext(Ct)
  let navigate=useNavigate()
  useEffect(()=>{
    Cookies.remove("lgc")
    obj.updStore({"token":"","name":"","uid":"","role":""})
    navigate("/")
  },[])
  return (
    <div>Logout</div>
  )
}

export default Logout