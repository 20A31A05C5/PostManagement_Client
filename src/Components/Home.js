import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Ct from './Ct'

function Home() {
  let obj=useContext(Ct)
  return (
    <div className='home'>
      <div className='sdmenu'>
        <Link to="/">All</Link>
        <Link to="/news">News</Link>
        <Link to="/sports">Sports</Link>
        <Link to="/others">Others</Link>
        {obj.store.token!=="" && <Link to="/pdm">My Posts</Link>}
      </div>
      <div className='content'>
        <Outlet/>
      </div>
    </div>
  )
}

export default Home