import { motion } from 'framer-motion'
import React from 'react'
import { Delivery, HeroBg } from '../assets';
import { buttonClick, staggerFadeInOut } from '../animations';
import { randomData } from '../utils/styles';
import { HiCurrencyRupee } from 'react-icons/hi2';
/// two grid for the main image 

const Home = () => {
  return <motion.div className="w-full grid grid=cols-1 md:grid-cols-2 gap-2"> 
   <div className="flex flex-col items-start justify-start gap-3  ">
        <div className="px-4 py-1 flex items-center justify-center gap-2 bg-orange-100 rounded-full" >
        <p className="text-lg font-semibold text-orange-500 "> Free Delivery </p>  
         <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary shadow-md "> 
            <img src={Delivery} alt="" className="w-full h-full " />
         </div>
        </div>
        <p className="text-[40px] text-headingColor md:text-[72px] font-sans font-extrabold tracking-wider">
            The Fastest Delivery in <span className="text-orange-500">Your City </span> </p>
        <p className="text-textColor text-lg ">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, quod quibusdam delectus debitis alias at! A, itaque. Ad quidem magnam, accusantium ab culpa sint. Quisquam libero suscipit fugit perspiciatis facilis. </p>   
        <motion.button {...buttonClick} className=" bg-gradient-to-bl from-orange-400 to-orange-600 px-4 py-2 rounded-xl text-black text-base font-semibold">Order Now </motion.button> 
   </div> 
   <div className="py-2 flex-1 flex items-center justify-end relative"> 
        <img  className="absolute top-0 right-0 md:-right-12 w-full h-420 md:w-auto md:h-650" src={HeroBg} alt="" /> 
        <div className="w-full md:w-460 ml-0 flex flex-wrap items-center justify-center gap-4 gap-y-14" >
            { randomData && randomData.map((data,i)=>(
                <motion.div key={i} {...staggerFadeInOut(i)} className="w-32 h-36 md:h-auto md:w-190 p-4 bg-lightOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg">
                    <img src={data.imageURL} alt="" className="w-12 h-12 md:w-32 md:h-32 md:-mt-16 object-contain" /> 
                    <p className='text-sm lg:text-xl font-semibold text-textColor '>{data.product_name.slice(0,14)}</p> 
                    <p className='text-[12px] text-center md:text-base text-lighttextGray font-semibold capitalize'> {data.product_category}</p>
                    <p className='text-sm font-semibold text-headingColor flex items-center'> 
                        <span className='text-xs text-red-600 '>
                        <HiCurrencyRupee className='text-red-500 h-18'/>    
                            </span>{" "} 
                    {data.product_price}</p>    
                </motion.div>
            )) }
            </div>   
   </div>
  </motion.div>
};

export default Home