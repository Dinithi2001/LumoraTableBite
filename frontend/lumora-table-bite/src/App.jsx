import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AdminDashboard from './pages/AdminDashboard'


function App() {

  return (
    <>
     <BrowserRouter>
          <Routes>
            <Route path='/' element={<AdminDashboard />} />
          </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
