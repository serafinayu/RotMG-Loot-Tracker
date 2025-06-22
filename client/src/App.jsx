import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home/>} />
        <Route index element={<MyItems/>} />
        <Route index element={<Settings/>} />
      </Routes>
    </ BrowserRouter>
  )
}

export default App
