import { useState } from 'react'
import './App.css'
import Dashboard from './components/Dashboard'
import CourseDetails from './components/CourseDetails'
import StudentDashboard from './components/StudentDashboard'
import Navbar from './components/Navbar'
import Cart from './components/Cart'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     {/* <CourseDetails/> */}
      {/* <Dashboard/> */}
      {/* <StudentDashboard/> */}
      {/* <Navbar/> */}
      <Cart/>
    </>
  )
}

export default App
