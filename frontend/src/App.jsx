import React from 'react'
import './App.css'
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound  from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import EventDetail from './pages/Event'
import Create from './pages/Create'

function Logout() {
  localStorage.clear()
  return <Navigate to="/" />
}

function RegisterLogout(){
  localStorage.clear()
  return <Register></Register>
}

function App() {
return (
  <BrowserRouter>
  <Routes>
  <Route path='/' element={<Home />}/>
  <Route path='/event/:id' element={<EventDetail />}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/logout' element={<Logout/>}/>
    <Route path='/register' element={<RegisterLogout/>}/>
    <Route path='/create' element={<ProtectedRoute><Create/></ProtectedRoute>}/>
    <Route path='*' element={<NotFound/>}/>
  </Routes>
  </BrowserRouter>
  )
}

export default App
