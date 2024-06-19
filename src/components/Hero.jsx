import React from 'react'
import Card from './Card'

const Hero = ({ courses ,loading }) => {  
  return (
    <>
    <div className='mx-auto max-w-7xl items-center grid grid-cols-1 md:grid-cols-3 gap-x-3 gap-y-6 px-4 py-2 sm:px-6 lg:px-8'>
        {
          loading ? 'Loading...' : (
             courses.map((course) => (
              <Card
                key={course.id}
                id = {course.id}
                title={course.title}
                image={course.image}
                one_description={course.one_description}
              />
            ))
          )}
        </div>
        </>
      )


}

export default Hero