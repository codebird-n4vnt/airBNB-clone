import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import "./App.css"
import AddListing1 from './pages/AddListing1.jsx'
import AddListing2 from './pages/AddListing2.jsx'
import AddListing3 from './pages/AddListing3.jsx'
import Mylisting from './pages/mylisting.jsx'
import { useContext } from 'react'
import { getUserContext } from './context/UserContext.jsx'
import ViewCard from './pages/ViewCard.jsx'
import Mybooking from './pages/Mybooking.jsx'




function App() {
  let {userData} = useContext(getUserContext)
  return (
    <>
      <Routes>
        <Route  path='/' element=<Home/>  />
        <Route  path='/login' element=<Login/>  />
        <Route  path='/signup' element=<SignUp/>  />
        <Route  path='/mylisting' element={userData?<Mylisting/>:<Navigate to={'/'}/>}  /> 
        <Route  path='/addlisting1' element={userData?<AddListing1/>:<Navigate to={'/'}/>}  /> 
        <Route  path='/addlisting2' element={userData?<AddListing2/>:<Navigate to={'/'}/>}  /> 
        <Route  path='/addlisting3' element={userData?<AddListing3/>:<Navigate to={'/'}/>}  /> 
        <Route  path='/viewcard' element={userData?<ViewCard/>:<Navigate to={'/'}/>}  /> 
        <Route  path='/mybooking' element={userData?<Mybooking/>:<Navigate to={'/'}/>}  /> 
      </Routes>

    </>
  )
}

export default App
