import './App.css'
import Home from './pages/Home'
import Room from './pages/Room'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/rooms' element={<Room />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
