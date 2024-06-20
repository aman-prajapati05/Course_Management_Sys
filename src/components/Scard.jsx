import React from 'react'
import { IoStar, IoStarHalf } from 'react-icons/io5';

const Scard = ({course,removeFromCart,addToWishlist}) => {

    const handleRemove = () => {
        removeFromCart(course.id);
      };
  return (
    <>
    <div className='bg-gray-500 h-[1px]  '></div>
    <div className='w-full py-4 flex justify-between flex-wrap'>
        <div className='flex gap-8'>
            <div className=' w-32 '>
                <img src={course.image} alt="img" />
            </div>
            <div className='flex flex-col'>
                <div className='font-bold text-lg'>{course.title}</div>
                <div className=' text-sm'>By {course.instructor}</div>
                <p className="my-1 flex gap-1 font-normal  dark:text-gray-400"><IoStar/><IoStar/><IoStar/><IoStar/><IoStarHalf/></p>
            </div>
        </div>
        <div className='flex gap-10'>
            <div className='flex flex-col gap-3'>
                <button className=' text-blue-600 hover:underline'onClick={handleRemove}>Remove</button>
                <button className=' text-blue-600 hover:underline'onClick={() => addToWishlist(course.id)}>Wishlist </button>
            </div>
            <div className='font-bold text-purple-500 text-lg'>
                FREE
            </div>
        </div>
    </div>
    </>
  )
}

export default Scard