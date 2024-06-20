import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Card from './Card'
import Subs from './Subs'
import Unsubs from './Unsubs'
import { getCourseDetails, getCurrentUser, getUserCourses, markCourseAsComplete } from '../firebase/FirebaseConfig'

const StudentDashboard = () => {

  const [user, setUser] = useState(null);
  const [coursesData, setCoursesData] = useState([]);

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
      const fetchUserCourses = async () => {
        try {
          getUserCourses(user.uid, async (courseIds) => {
            if (courseIds.length > 0) {
              const coursesData = await getCourseDetails(courseIds);
              setCoursesData(coursesData);
            } else {
              setCoursesData([]);
            }
          });
        } catch (error) {
          console.error('Error fetching user courses:', error);
        }
      };

      fetchUserCourses();
    }
  }, [user]);

  const handleMarkAsComplete = async (courseId) => {
    try {
      await markCourseAsComplete(user.uid, courseId);
      setCoursesData(coursesData.map(course => 
        course.id === courseId ? { ...course, completed: true } : course
      ));
    } catch (error) {
      console.error('Error marking course as complete:', error);
    }
  };

  const completedCourses = coursesData.filter(course => course.completed);
  const incompleteCourses = coursesData.filter(course => !course.completed);


  
  return (
    <>
    <Navbar/>
    
        
            <div className='md:h-40 h-28  bg-black'>
                <div className='  mx-auto flex flex-wrap max-w-7xl items-baseline justify-between px-4 py-8 sm:px-6 lg:px-8'>
                    <p className='text-white text-5xl md:text-6xl pt-4 md:pt-0'>My Courses</p>
                    
                </div>
            </div>
            <Unsubs courses={incompleteCourses} onMarkAsComplete={handleMarkAsComplete} />
            <Subs courses={completedCourses} />

        
 
    </>

  )
}

export default StudentDashboard