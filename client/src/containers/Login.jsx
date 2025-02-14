import React from 'react'
import { LoginBg, Logo } from '../assets';
//for method 1 
// export const Login = () => {
//   return (
//     <div>login</div>
//   )
// }
//for method 2
const Login = () => {
  return (
    <div className="w-screen h-screen relative overflow-hidden flex">
      
    {/*background image*/}
    <img 
    src={LoginBg} 
    className="w-full h-full object-cover absolute " 
    alt=""
    />  
      {/*content box*/}
      <div
      className="flex flex-col items-center bg-lightOverlay w-[25%] md:w-208 h-full z-10 backdrop-blur-md p-4 px-4 py-12" >
        <div className="flex items-center justify-start gap-4 w-full">
          <img src={Logo}  className='w-8' alt="" />
          <p className='font-semibold text-2xl'>City</p>
        </div>
      </div>  
    </div>
  )
}
export default Login;
