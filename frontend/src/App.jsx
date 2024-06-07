import React from 'react'
import './App.css'
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound  from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import EventDetail from './pages/Event'

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterLogout(){
  localStorage.clear()
  return <Register></Register>
}

function App() {
return (
  <BrowserRouter>
  <Routes>
  <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>}/>
  <Route path='/event/:id' element={<ProtectedRoute><EventDetail /></ProtectedRoute>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/logout' element={<Logout/>}/>
    <Route path='/register' element={<RegisterLogout/>}/>
    <Route path='*' element={<NotFound/>}/>
  </Routes>
  </BrowserRouter>
  )
}

export default App
