import React from 'react'
import Card from './Card'

const Unsubs = ({ courses, onMarkAsComplete }) => {
  return (
    <>
        <div className='mx-auto  max-w-7xl border-b-2 px-4 py-8 sm:px-6 text-black lg:px-8'>
            <div className='text-3xl font-bold text-purple-500'>Uncompleted </div>
        </div>
            <div className=' mx-auto flex flex-wrap max-w-7xl justify-between px-4 py-8 sm:px-6 lg:px-8'>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 '>
      {courses.map(course => (
        <div key={course.id} className='  p-4'>
          <div className='bg-white p-6 rounded-lg shadow-lg'>
            <img className='h-40 rounded w-full object-cover object-center mb-6' src={course.image} alt={course.title} />
            <h3 className='tracking-widest text-indigo-500 text-xs font-medium title-font'>{course.instructor}</h3>
            <h2 className='text-lg text-gray-900 font-medium title-font mb-4'>{course.title}</h2>
            <p className='leading-relaxed text-base'>{course.one_description}</p>
            <button onClick={() => onMarkAsComplete(course.id)} className='bg-indigo-500 text-white px-4 py-2 rounded'>
              Mark as Complete
            </button>
          </div>
        </div>
      ))}
    </div>
            </div>
    </>
  )
}

export default Unsubs