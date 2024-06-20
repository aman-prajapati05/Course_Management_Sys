import React from 'react'
import Navbar from './Navbar'
import Card from './Card'
import { useState,useEffect } from 'react'
import {  getCourseDetails1, getCurrentUser, getWishlist } from '../firebase/FirebaseConfig'

const Wishlist = () => {
    const [loading, setLoading] = useState(true);
    const [coursesData, setCoursesData] = useState([]);
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const currentUser = await getCurrentUser();
          setUser(currentUser);
        //   console.log(currentUser);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching current user:', error);
          setLoading(false);
        }
      };
  
      fetchUser();
    }, []);
  
    useEffect(() => {
        if (user) {
          const unsubscribe = getWishlist(user.uid, (courseIds) => {
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
        } catch (error) {
          console.error('Error fetching courses:', error);
        }
      };
  
    if (loading) {
      return <p>Loading...</p>;
    }
  
    if (!user) {
      return <p>User not authenticated</p>;
    }
  

  return (
    <>
    <Navbar/>
    <div className='md:h-40 h-28  bg-black'>
                <div className='  mx-auto flex flex-wrap max-w-7xl items-baseline justify-between px-4 py-8 sm:px-6 lg:px-8'>
                    <p className='text-white text-5xl md:text-6xl pt-4 md:pt-0'>Wishlist</p>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-28'>
            {coursesData.length > 0 ? (
              coursesData.map((course) => (
                <Card
                  key={course.id}
                  id={course.id}
                  title={course.title}
                  image={course.image}
                  one_description={course.one_description}
                  instructor={course.instructor}
                />
              ))
            ) : (
              <p>No courses found in wishlist</p>
            )}
          </div>
        </div>
                </div>
           
    </>
  )
}

export default Wishlist