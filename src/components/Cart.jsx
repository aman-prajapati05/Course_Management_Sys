import React from 'react'
import Navbar from './Navbar'
import Scard from './Scard'
import { Link } from 'react-router-dom'

const Cart = () => {
  return (
    <>
    <Navbar/>
    <div className='md:h-40 h-38  bg-black'>
                <div className='  mx-auto flex flex-wrap max-w-7xl items-baseline justify-between px-4 py-8 sm:px-6 lg:px-8'>
                    <p className='text-white text-5xl md:text-6xl pt-4 md:pt-0'>Shopping Cart</p>  
                </div>
            </div>
            <div className='flex mx-auto max-w-7xl justify-between flex-wrap'>
            <div className='px-4 py-8 sm:px-6 lg:px-8 md:w-[70%]'>
                     <p className='text-xl font-semibold'>1 cousre in cart</p>
                     
                     <Scard/>
                     <Scard/>
                        <Scard/>
                        <Scard/>    
            </div>
            <div className='flex flex-col md:w-[30%]  px-4 py-12 sm:px-6 lg:px-8 flex-wrap '>
                <div className='text-lg font-semibold'>Total:</div>
                <div className='text-4xl font-bold text-purple-500 py-2'>$544</div>
               <Link to='/Checkout'> <button className='  text-white bg-black text-lg font-bold p-4 '>Checkout</button></Link>
            </div>
            </div>
    </>
    )
}

export default Cart