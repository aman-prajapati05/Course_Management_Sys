import React from 'react'

const Scard = ({course,removeFromCart}) => {

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
                <div className='text-sm'>Rating</div>
            </div>
        </div>
        <div className='flex gap-10'>
            <div>
                <button className=' text-blue-600 hover:underline'onClick={handleRemove}>Remove</button>
            </div>
            <div className='font-bold text-purple-500 text-lg'>
                $549
            </div>
        </div>
    </div>
    </>
  )
}

export default Scard