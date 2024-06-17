import React from 'react'
import Card from './Card'

const Hero = () => {
  return (
    <>
    <div className='p-10 grid grid-cols-3 gap-y-8'>
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