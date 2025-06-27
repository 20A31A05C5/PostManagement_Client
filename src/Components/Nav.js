import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Ct from './Ct'

function Nav() {
  let obj=useContext(Ct)
  return (
    <nav>
      <Link to="/">Posts</Link>
      {obj.store.token==="" &&<Link to="/reg">Register</Link> }
      {obj.store.token==="" &&<Link to="/login">Login</Link> }
      {obj.store.token!=="" && obj.store.role==="user" &&<Link to="/add">Add</Link> }
      {obj.store.token!=="" && obj.store.role!=="user" &&<Link to="/admin">Admin</Link> }
      {obj.store.token!=="" && <Link to="/logout">Logout</Link>}
      {obj.store.token!=="" && <h2>{obj.store.name}</h2>}


    </nav>
  )
}

export default Nav