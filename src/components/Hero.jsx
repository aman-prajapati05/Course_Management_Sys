import React from 'react'
import Card from './Card'

const Hero = () => {
  return (
    <>
    <div className='mx-auto max-w-7xl items-center grid grid-cols-3 gap-x-3 gap-y-6 px-4 py-2 sm:px-6 lg:px-8'>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/> 
        <Card/> 
    </div>
    </>
  )
}

export default Hero