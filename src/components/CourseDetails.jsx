import React from "react";
import Navbar from "./Navbar";
import { IoCheckmark } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { fetchCourseById } from "../firebase/FirebaseConfig";
import { useState, useEffect } from "react";
import Accordion from "./Accordion";

const CourseDetails = () => {
  const courseId = "0a8wNwBBUaF3YUYp9uHW";
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const getCourse = async () => {
      try {
        if (!courseId) {
          console.error("Course ID is missing");
          return;
        }
        console.log("Fetching course with ID:", courseId);
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

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="hidden lg:block bg-black  h-80">
        <div className="mx-auto flex flex-wrap max-w-7xl justify-between px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-white lg:w-[60%]">
            <h1 className="text-xs font-bold">{course.category}</h1>
            <p className="text-3xl font-bold pt-3">{course.title}</p>
            <p className="text-sm pt-3">{course.one_description}</p>
            <p className="pt-4">{course.instructor}</p>
            <div className="flex justify-start pt-4 gap-4">
              <div>Last updated 12/2022</div>
              <div>English</div>
              <div>English [Auto]</div>
            </div>
          </div>

          <div className="lg:w-[25%] hidden lg:block  fixed right-20  bg-white rounded-2xl border-x-slate-200 shadow-2xl   ">
            <div className="w-full  border">
              <img className="w-full" src={course.image} alt="" />
            </div>
            <div className="flex flex-col mx-8 gap-4">
            <div className="text-4xl font-bold text-purple-500 py-2">Price:  $544</div>
        <button className="  text-white bg-black text-lg font-bold p-4 px-12 ">
          Enroll Now
        </button>
        <button className="  text-black border  text-lg font-bold p-4 px-11 mb-6">
          Add to Cart
        </button>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden flex flex-col items-center w-[90%] gap-4 mx-auto">
        <div className="text-xs font-bold ">
          {/* {course.category} */} hello
        </div>
        <div className="w-[90%] md:w-[70%]">
          <img className="w-full" src={course.image} alt="" />
        </div>
        <div className="text-3xl font-bold pt-3 ">{course.title}</div>
        <p className="text-xl  ">{course.one_description}</p>
        <p className="pt-4   text-lg">{course.instructor}</p>
        <div className="flex justify-start pt-4 gap-4">
          <div>Last updated 12/2022</div>
          <div>English</div>
          <div>English [Auto]</div>
        </div>
        <div className="text-4xl font-bold text-purple-500 py-2">$544</div>
        <button className="  text-white bg-black text-lg font-bold p-4 px-12 ">
          Enroll Now
        </button>
        <button className="  text-black border  text-lg font-bold p-4 px-11 ">
          Add to Cart
        </button>
      </div>
      <div className="mx-auto flex flex-wrap max-w-7xl justify-between px-4 py-8 sm:px-6 lg:px-8">
        <div className=" border-2 border-black lg:w-[50%]">
          <p className="text-3xl font-bold py-2 px-5">What You'll learn</p>
          <div className="grid grid-cols-2 px-5 py-4 pb-7">
            <div className="flex ">
              <div className="m-1">
                <IoCheckmark />
              </div>
              <p className="px-1">Creating user accounts</p>
            </div>
            <div className="flex ">
              <div className="m-1">
                <IoCheckmark />
              </div>
              <p className="px-1">Creating user accounts</p>
            </div>
            <div className="flex ">
              <div className="m-1">
                <IoCheckmark />
              </div>
              <p className="px-1">Creating user accounts</p>
            </div>
            <div className="flex ">
              <div className="m-1">
                <IoCheckmark />
              </div>
              <p className="px-1">Creating user accounts</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto flex flex-wrap max-w-7xl justify-between px-4 py-8 sm:px-6 lg:px-8">
        <div className=" lg:w-[50%]">
          <p className="text-3xl font-bold py-2 px-5">Course Contents</p>
          {/* Accordion */}
          <Accordion/>
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
