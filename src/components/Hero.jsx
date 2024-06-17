import React from 'react'
import Card from './Card'

const Hero = () => {
  return (
    <>
    <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8'>
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