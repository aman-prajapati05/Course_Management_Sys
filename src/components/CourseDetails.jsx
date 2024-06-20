import React from "react";
import Navbar from "./Navbar";
import { IoCheckmark, IoStarHalf } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { fetchCourseById, onAuthStateChanged ,auth} from "../firebase/FirebaseConfig";
import { useState, useEffect } from "react";
import Accordion from "./Accordion";
import { Link } from "react-router-dom";
import { addCourseToCart } from "../firebase/FirebaseConfig";
import { IoStar } from "react-icons/io5";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { CiGlobe } from "react-icons/ci";
import { MdSubtitles } from "react-icons/md";

const CourseDetails = () => {
  const {courseId} = useParams();
  const [course, setCourse] = useState(null);
  const [user, setUser] = useState(null);
  const [addedtocart,setAddedtocart] = useState(false);

  useEffect(() => {
    const getCourse = async () => {
      try {
        if (!courseId) {
          console.error("Course ID is missing");
          return;
        }
        // console.log("Fetching course with ID:", courseId);
        const courseData = await fetchCourseById(courseId);
        if (courseData) {
          setCourse(courseData);
        } else {
          console.error("No course found with the provided ID");
        }
      } catch (error) {
        console.error("Error fetching course: ", error);
      }
    };
    getCourse();
  }, [courseId]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!course) {
    return <div>Loading...</div>;
  }
  const handleAddToCart = async () => {
    if (user) {
      try {
        await addCourseToCart(user.uid, courseId);
        if (addCourseToCart.success) {
          alert("Course added to cart successfully!");
          setAddedtocart(true);
        }
        
      } catch (error) {
        console.error("Error adding course to cart: ", error);
        alert("Failed to add course to cart. Please try again later.");
      }
    } else {
      alert("Please sign in to add courses to your cart.");
      
    }
  };

  return (
    <>
      <Navbar />
      <div className="hidden lg:block bg-black  h-80">
        <div className="mx-auto flex flex-wrap max-w-7xl justify-between px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-white lg:w-[60%]">
            <h1 className="text-xs font-bold">{course.courseCategory}</h1>
            <p className="text-3xl font-bold pt-3">{course.title}</p>
            <p className="text-sm pt-3">{course.one_description}</p>
            <p className="pt-4">{course.instructor}</p>
            <p className="my-3 flex gap-1 font-normal  dark:text-gray-400"><IoStar/><IoStar/><IoStar/><IoStar/><IoStarHalf /></p>
            <div className="flex justify-start pt-4 gap-4">
              <div className="flex gap-1 items-center"><IoMdInformationCircleOutline />Last updated 12/2022</div>
              <div className="flex gap-1 items-center"><CiGlobe />English</div>
              <div className="flex gap-1 items-center"><MdSubtitles />English [Auto]</div>
            </div>
          </div>

          <div className="lg:w-[25%] hidden lg:block  fixed right-20  bg-white rounded-2xl border-x-slate-200 shadow-2xl   ">
            <div className="w-full  border">
              <img className="w-full" src={course.image} alt="" />
            </div>
            <div className="flex flex-col mx-8 gap-4">
            <div className="text-4xl font-bold text-purple-500 py-2">Price:  FREE</div>
            <Link to='/Addtocart' className=""><div onClick={handleAddToCart} className="  text-white bg-black text-lg font-bold p-4 xl:px-24 lg:pl-10 md:px-14">
            Enroll Now
        </div></Link>
        { addedtocart ?
          (  <Link to ='/Addtocart'><div  className="  text-black border  text-lg font-bold p-4 px-11 ">
          Go to Cart
        </div></Link>):
        (<button onClick={handleAddToCart} className="  text-black border mb-8 text-lg font-bold p-4 px-11 ">
          Add to Cart
        </button>)}
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden flex flex-col items-center w-[90%] gap-4 mx-auto">
        <div className="text-xs font-bold ">
          {course.courseCategory}
        </div>
        <div className="w-[90%] md:w-[70%]">
          <img className="w-full" src={course.image} alt="" />
        </div>
        <div className="text-3xl font-bold pt-3 ">{course.title}</div>
        <p className="text-xl  ">{course.one_description}</p>
        <p className="pt-4   text-lg">{course.instructor}</p>
        <p className="my-1 flex gap-1 font-normal  dark:text-gray-400"><IoStar/><IoStar/><IoStar/><IoStar/><IoStarHalf /></p>
        <div className="flex justify-start pt-4 gap-4">
          <div>Last updated 12/2022</div>
          <div>English</div>
          <div>English [Auto]</div>
        </div>
        <div className="text-4xl font-bold text-purple-500 py-2">FREE</div>
        <Link to ='/Addtocart'><div onClick={handleAddToCart} className="  text-white bg-black text-lg font-bold text-center p-4 px-12 ">
          Enroll Now
        </div></Link>
        { addedtocart ?
          (  <Link to ='/AddtoCart'><div  className=" cursor-pointer text-black border  text-lg font-bold p-4 px-11 ">
          Go to Cart
        </div></Link>):
        (<button onClick={handleAddToCart} className="  text-black border  text-lg font-bold p-4 px-11 ">
          Add to Cart
        </button>)}
        
      </div>
      <div className="mx-auto flex flex-wrap max-w-7xl justify-between px-4 py-8 sm:px-6 lg:px-8">
        <div className=" border-2 border-black lg:w-[50%]">
          <p className="text-3xl font-bold py-2 px-5">What You'll learn</p>
          <div className="grid grid-cols-2 px-5 py-4 pb-7">
          {course.Outcome.map((outcome, index) => (
              <div className="flex" key={index}>
                <div className="m-1">
                  <IoCheckmark />
                </div>
                <p className="px-1">{outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto flex flex-wrap max-w-7xl justify-between px-4 py-8 sm:px-6 lg:px-8">
        <div className=" lg:w-[50%]">
          <p className="text-3xl font-bold py-2 px-5">Course Contents</p>
          <p className="px-5">Course Duration:{course.duration}</p>
          {/* Accordion */}
          <div className="px-5"><Accordion contents={course.content} /></div>
          
        </div>
      </div>

      <div className="mx-auto flex flex-wrap max-w-7xl justify-between px-4 py-8 sm:px-6 lg:px-8">
        <div className=" lg:w-[50%]">
          <p className="text-3xl font-bold py-2 px-5">Requirements</p>
          <div className="px-5">
            {course.requirements.map((req, index) => (
              <p key={index}>{req}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto flex flex-wrap max-w-7xl justify-between px-4 py-8 sm:px-6 lg:px-8">
        <div className=" lg:w-[50%]">
          <p className="text-3xl font-bold py-2 px-5">Description</p>
          <div className="px-5">{course.long_description}</div>
        </div>
      </div>
    </>
  );
};

export default CourseDetails;
