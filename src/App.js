import React from "react";
import Landing from "./Landing";
import Login from "./login";
import Signup from "./signup";
import { Routes, Route } from 'react-router-dom';
import Dashboard from "./dashboard";
import Search from "./Search";
import Terms from "./terms";
import Profile from "./profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/search" element={<Search/>}/>
      <Route path="/terms" element={<Terms/>}/>
      <Route path="/profile" element={<Profile/>}/>
    </Routes>
  );
}

export default App;
