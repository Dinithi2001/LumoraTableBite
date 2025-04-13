import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AdminDashboard from './pages/AdminDashboard'
import Menu from './pages/Menu'
import AddFood from './pages/AddFood'


function App() {

  return (
    <>
     <BrowserRouter>
          <Routes>
            <Route path='/' element={<AdminDashboard />} />
          </Routes>
          <Routes>
            <Route path='/menu' element={<Menu />} />
          </Routes>
          <Routes>
            <Route path="/menu/add-product" element={<AddFood/>} />
          </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
