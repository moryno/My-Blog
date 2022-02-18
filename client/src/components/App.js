import React, {useState, useEffect, useContext} from "react";
import TopBar from "./topbar/TopBar"
import Footer from "./footer/Footer";
import Home from "./pages/home/Home";
import Single from "./pages/single/Single";
import Compose from "./pages/compose/Compose";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Context } from "../context/Context";






function App() {
  const {user} = useContext(Context);

 

  return (
    <Router>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={user? <Home /> : <Register />} />
        <Route path="/login" element={user? <Home /> : <Login />} />
        <Route path="/settings" element={user? <Settings /> : <Register />} />
        <Route path="/compose" element={user? <Compose /> : <Register />} />
        <Route path="/post/:postId" element={<Single />} />
          
      </Routes>

      
      
     <Footer />

      
    </Router>
    
  );
}

export default App;

