import Dashboard from '../Pages/Dashboard/Dashboard'
import Booking from '../Pages/Booking/Booking'
import './App.css'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'

function App() {

  return (
    <div>  
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/booking" element={<Booking />} /> 
      </Routes> 
    </div>
  )
}

export default App
