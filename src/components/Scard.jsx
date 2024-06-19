import React from 'react'

const Scard = () => {
  return (
    <>
    <div className='bg-gray-500 h-[1px]  '></div>
    <div className='w-full py-4 flex justify-between flex-wrap'>
        <div className='flex gap-8'>
            <div className=' w-32 '>
                <img src="https://img-c.udemycdn.com/course/240x135/4188320_d3e3_3.jpg" alt="img" />
            </div>
            <div className='flex flex-col'>
                <div className='font-bold text-lg'>Git and Github the practical guide</div>
                <div className=' text-sm'>By Aman Prajapati</div>
                <div className='text-sm'>Rating</div>
            </div>
        </div>
        <div className='flex gap-10'>
            <div>
                <button className=' text-blue-600 hover:underline'>Remove</button>
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