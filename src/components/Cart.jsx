import React from 'react'
import Navbar from './Navbar'
import Scard from './Scard'
import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react'
import {  addCourseToWishlist, getCourseDetails1, getCurrentUser, getUserCart, removeCourseFromCart } from '../firebase/FirebaseConfig'

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
          setCartItems(courseIds); 
        } catch (error) {
          console.error('Error fetching courses:', error);
        }
      };

      const handleRemoveCourse = async (courseId) => {
        try {
          await removeCourseFromCart(user.uid, courseId);
          const updatedCourseIds = cartItems.filter(id => id !== courseId);
          setCartItems(updatedCourseIds);
        } catch (error) {
          console.error('Error removing course from cart:', error);
        }
      };

      const addToWishlist = async (courseId) => {
        try {
          await addCourseToWishlist(user.uid, courseId);
          alert('Course added to wishlist!');
          handleRemoveCourse(courseId);
        } catch (error) {
          console.error('Error adding course to wishlist:', error);
          alert('Failed to add course to wishlist. Please try again later.');
        }
      };
      
      
    
     
    
      const calculateTotal = () => {
        // return coursesData.reduce((total, item) => total + item.price, 0);
        return 0;
      };

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
            <Scard key={item.id} course={item} removeFromCart={() => handleRemoveCourse(item.id)} addToWishlist={addToWishlist}/>
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