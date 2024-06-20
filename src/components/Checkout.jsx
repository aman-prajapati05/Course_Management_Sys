import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Link, useLocation, useNavigate  } from 'react-router-dom'
import { getCourseDetails, getCourseDetails1, getCurrentUser, getUserCart } from '../firebase/FirebaseConfig';
import { addPurchasedCourses, clearCart} from '../firebase/FirebaseConfig';

const Checkout = () => {

  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [coursesData, setCoursesData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error fetching current user:', error);
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

  const calculateTotal = () => {
    return coursesData.reduce((total, item) => total + item.price, 0);
  };

  // const handleBuy = async () => {
  //   if (!user) return;

  //   try {
  //     await addPurchasedCourses(user.uid, cartItems);
  //     await clearCart(user.uid);
  //     navigate('/MyCourses'); // Navigate to the My Courses page
  //   } catch (error) {
  //     console.error('Error completing purchase:', error);
  //   }
  // };

  // const handleBuy = async () => {
  //   if (!user || !cartItems || cartItems.length === 0) return;

  //   try {
  //     // Ensure cartItems is an array of objects with at least an 'id' field
  //     const coursesWithIds = cartItems.map(course => ({ id: course.id }));

  //     // Add purchased courses with initial completion status
  //     await addPurchasedCourses(user.uid, coursesWithIds);

  //     // Clear the user's cart after purchasing courses
  //     await clearCart(user.uid);

  //     // Navigate to the My Courses page after successful purchase
  //     navigate('/MyCourses');
  //   } catch (error) {
  //     console.error('Error completing purchase:', error);
  //   }
  // };
  const handleBuy = async () => {
    if (!user || cartItems.length === 0) return;
  
    try {
      // Prepare courses array from cartItems
      const coursesToPurchase = cartItems.map(courseId => ({
        id: courseId,
        completed: false,
        // Add other necessary fields like completed if required
      }));
  
      await addPurchasedCourses(user.uid, coursesToPurchase);
      await clearCart(user.uid);
      navigate('/MyCourses'); // Navigate to the My Courses page
    } catch (error) {
      console.error('Error completing purchase:', error);
    }
  };
  
  


  return (
    <>
    <div className='mx-auto flex flex-wrap max-w-7xl justify-between border-b-2 shadow-sm px-4 py-8 sm:px-6 text-black lg:px-8'>
      <div className='text-3xl font-bold text-gray-900 dark:text-white'>Logo</div>
      <Link to = '/' ><button className=' text-purple-500 text-xl hover:underline'>Cancel</button></Link>
    </div>
    <div className='mx-auto max-w-7x px-4 py-8 sm:px-6 text-black lg:px-8'>
  
    <div className='flex justify-center text-4xl font-semibold'>
            Checkout
        </div>
        <div className='flex justify-center text-xl font-semibold'>
            Summary
        </div>

            <div className=' flex justify-center mx-14'>
            <div className=' rounded-2xl w-96  text-white bg-gray-700 flex-col items-center'>
            <div className=' text-3xl py-4 px-6'>Price : 455</div>
            <div className=' text-3xl px-6'>Discount Price : 577</div>
            <button className='text-center text-3xl px-44 py-20 hover:text-purple-500' onClick={handleBuy}>Buy</button>
            </div>
            </div>
  </div>
  </>
  )
}

export default Checkout