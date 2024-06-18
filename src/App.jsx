import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './components/Dashboard'
import CourseDetails from './components/CourseDetails'
import StudentDashboard from './components/StudentDashboard'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     {/* <CourseDetails/>
      */}
      {/* <Dashboard/> */}
      {/* <StudentDashboard/> */}
      <Navbar/>
        </>
  )
}

export default App
