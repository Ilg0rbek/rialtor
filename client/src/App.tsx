import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import About from "./pages/about";
import Profile from "./pages/profile";
import Header from "./components/Header";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/main" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Navigate to={"/login"} />} />
        <Route path="*" element={<h1>Page not found 404 🥶😫</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
