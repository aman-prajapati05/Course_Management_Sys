import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Dashboard from './components/Dashboard'
import StudentDashboard from './components/StudentDashboard'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import CourseDetails from './components/CourseDetails.jsx'
import Cart from './components/Cart.jsx'
import Checkout from './components/Checkout.jsx'
import Wishlist from './components/Wishlist.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<Dashboard/>
  },
  {
    path:'/Mycourses',
    element:<StudentDashboard/>
  },
  {
    path:'/courses/:courseId',
    element:<CourseDetails/>
  },
  {
    path:'/AddtoCart',
    element:<Cart/>
  },
  {
    path:'/Checkout',
    element:<Checkout/>
  },
  {
    path:'Wishlist',
    element:<Wishlist/>
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {  router}>  
    <App />
    </RouterProvider> 
  </React.StrictMode>,
)
