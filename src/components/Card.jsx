import React from 'react'
import { useNavigate } from 'react-router-dom';
import { IoStar,IoStarHalf } from "react-icons/io5";

const Card = ({id,title,one_description,image,instructor}) => {
    const navigate = useNavigate();
    const handleClick = ()=>{
        console.log(id)
        navigate(`/courses/${id}`);
    }
  return (
   

<div onClick={handleClick} className=" cursor-pointer max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
   
        <img className="rounded-t-lg w-full" src={image}alt="" />
    
    <div className="p-5">
     
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
            <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">By {instructor}</p>
            <p className="mb-3 flex gap-1 font-normal text-gray-700 dark:text-gray-400"><IoStar/><IoStar/><IoStar/><IoStar/><IoStarHalf /></p>
     
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{one_description}</p>
        <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
             <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </a>
    </div>
</div>

  )
}

export default Card