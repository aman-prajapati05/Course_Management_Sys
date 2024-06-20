import React from 'react'
import Navbar from './Navbar'
import Scard from './Scard'
import { Link, Navigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import {  getCourseDetails, getCourseDetails1, getCurrentUser, getUserCart, removeCourseFromCart } from '../firebase/FirebaseConfig'

const Cart = () => {

    const [cartItems, setCartItems] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [coursesData, setCoursesData] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const currentUser = await getCurrentUser();
            setUser(currentUser);
          } catch (error) {
            console.error('Error fetching current user:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchUser();
      }, []);

      useEffect(() => {
        if (user) {
          const unsubscribe = getUserCart(user.uid, (courseIds) => {
            if (courseIds.length > 0) {
              fetchCourseDetails(courseIds);
            } else {
              setCartItems([]);
              setCoursesData([]);
            }
          });
      
          return () => unsubscribe();
        }
      }, [user]);

      const fetchCourseDetails = async (courseIds) => {
        try {
          const coursesData = await getCourseDetails1(courseIds);
          setCoursesData(coursesData);
          setCartItems(courseIds); // Set course IDs separately if needed
        } catch (error) {
          console.error('Error fetching courses:', error);
        }
      };

      // const handleRemoveCourse = async (courseId) => {
      //   try {
      //     await removeCourseFromCart(user.uid, courseId);
      //     const updatedCourseIds = cartItems.filter(id => id !== courseId);
      //     setCartItems(updatedCourseIds);
      //   } catch (error) {
      //     console.error('Error removing course from cart:', error);
      //   }
      // };

      const handleRemoveCourse = async (courseId) => {
        try {
          await removeCourseFromCart(user.uid, courseId);
          // Update local state to remove the course from cartItems
          const updatedCourseIds = cartItems.filter(id => id !== courseId);
          setCartItems(updatedCourseIds);
          // Optionally, fetch updated course details if needed
          // fetchCourseDetails(updatedCourseIds);
        } catch (error) {
          console.error('Error removing course from cart:', error);
        }
      };
      
     
    
      const calculateTotal = () => {
        // return coursesData.reduce((total, item) => total + item.price, 0);
        return 0;
      };
      // const handleCheckout = () => {
      //   Navigate('/Checkout', { state: { cartItems, coursesData, totalPrice: calculateTotal() } });
      // };

  return (
    <>
    <Navbar/>
    <div className='md:h-40 h-38  bg-black'>
                <div className='  mx-auto flex flex-wrap max-w-7xl items-baseline justify-between px-4 py-8 sm:px-6 lg:px-8'>
                    <p className='text-white text-5xl md:text-6xl pt-4 md:pt-0'>Shopping Cart</p>  
                </div>
            </div>
            <div className='flex mx-auto max-w-7xl justify-between flex-wrap'>
            <div className='px-4 py-8 sm:px-6 lg:px-8 md:w-[70%]'>
                     <p className='text-xl font-semibold'>{coursesData.length} course{coursesData.length !== 1 ? 's' : ''} in cart</p>
                     
                     {coursesData && coursesData.length > 0 ? (coursesData.map(item => (
            <Scard key={item.id} course={item} removeFromCart={() => handleRemoveCourse(item.id)} />
          ))) : (<p>No items in cart</p>)}   
            </div>
            <div className='flex flex-col md:w-[30%]  px-4 py-12 sm:px-6 lg:px-8 flex-wrap '>
                <div className='text-lg font-semibold'>Total:</div>
                <div className='text-4xl font-bold text-purple-500 py-2'>${calculateTotal()}</div>
               <Link to='/Checkout'> <button className='  text-white bg-black text-lg font-bold p-4 '>Checkout</button></Link>
            </div>
            </div>
    </>
    )
}

export default Cart