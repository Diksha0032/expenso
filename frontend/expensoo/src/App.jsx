import React from 'react';
import {BrowserRouter as Router,Routes,Route,} from "react-router-dom";
import { Navigate } from 'react-router-dom';
import Home from "./pages/DashBoard/Home";
import Login from "./pages/Auth/Login";
import SignUp from './pages/Auth/SignUp';
import Income from './pages/DashBoard/Income';
import Expense from './pages/DashBoard/Expense';
import UserProvider from './context/userContext';

 const Root=()=>{
  const isAuthenticated=!!localStorage.getItem("token")
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
}

const App=()=>{
  return(
    <UserProvider>
      <div className='bg-[#F0FDFA]'>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<SignUp />} />
          <Route path="/dashboard" exact element={<Home />} />
          <Route path="/income" exact element={<Income />} />
           <Route path="/expense" exact element={<Expense />} />
        </Routes>
      </Router>
      </div>
    </UserProvider>
  )
} 

export default App

