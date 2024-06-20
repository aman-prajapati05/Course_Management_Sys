import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import { FooterThree } from './Footer'
import { useState,useEffect } from 'react'
import { fetchCourses } from '../firebase/FirebaseConfig';


const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoursesData = async () => {
      try {
        const coursesData = await fetchCourses();
        setCourses(coursesData);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCoursesData();
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = courses.filter((course) => 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filtered);
    console.log('Filtered:', filtered);
  };



  return (
   <>
   <Navbar onSearch = {handleSearch}/>
   <Hero courses={filteredCourses.length > 0 ? filteredCourses : courses} loading={loading} />
   <FooterThree/>
   
   </>
  )
}

export default Dashboard