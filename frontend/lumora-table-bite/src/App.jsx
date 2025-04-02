import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AdminDashboard from './pages/AdminDashboard'
import Menu from './pages/Menu'


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
     </BrowserRouter>
    </>
  )
}

export default App
