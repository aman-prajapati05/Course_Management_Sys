import React from 'react'
import Card from './Card'

const Subs = () => {
  return (
    <>
        <div className='mx-auto  max-w-7xl border-b-2 px-4 py-8 sm:px-6 text-black lg:px-8'>
            <div className='text-3xl font-bold text-purple-500'>Completed </div>
        </div>
            <div className=' mx-auto flex flex-wrap max-w-7xl justify-between px-4 py-8 sm:px-6 lg:px-8'>
             <Card/>
            </div>
    </>
  )
}

export default Subs