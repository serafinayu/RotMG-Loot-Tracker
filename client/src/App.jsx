// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import FAQ from "./pages/FAQ";
import ItemContextProvider from "./context/ItemContext.jsx";

function App() {
  return (
    <BrowserRouter>
      <ItemContextProvider>
        <div className="w-full h-screen bg-[#050505] flex flex-col">
          <Navbar />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
        </div>
      </ItemContextProvider>
    </BrowserRouter>
  );
}

export default App;
