import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AdminDashboard from './pages/AdminDashboard'
import Menu from './pages/Menu'
import AddFood from './pages/AddFood'
import WelcomePage from './pages/WelcomePage'
import SelectTablePage from './pages/SelectTablePage'
import KitchenInterface from './pages/KitchenInterface'


function App() {

  return (
    <>
     <BrowserRouter>
          <Routes>
            <Route path='/' element={<AdminDashboard />} />
            <Route path='/menu' element={<Menu />} />
            <Route path="/menu/add-product" element={<AddFood/>} />
            <Route path='/welcome' element={<WelcomePage/>}/>
            <Route path='/select-table' element={<SelectTablePage/>}/>
            <Route path='/kitchen' element={<KitchenInterface/>}/>
          </Routes>
          
          
     </BrowserRouter>
    </>
  )
}

export default App
