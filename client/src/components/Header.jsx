import React, { useState } from 'react'
import {Link, NavLink, useNavigate} from 'react-router-dom' 
import {Logo } from '../assets'
import { isActiveStyles, isNotActiveStyles } from '../utils/styles'
import { motion } from 'framer-motion' 
import { buttonClick, SlideTop } from '../animations'
import {MdLogout, MdShoppingCart} from '../assets/icons'
import {useDispatch, useSelector } from 'react-redux' 
import {getAuth } from 'firebase/auth'  
import {app} from '../config/firebase.config'
import { setUserNull } from '../context/actions/userActions'
import { setCartOn } from '../context/actions/displayCartAction'
const Header = () => {
  const [visible,setVisible]=useState(false); 
  const user=useSelector(state=>state.user); 
  const cart=useSelector((state)=>state.cart); 
  const firebaseAuth=getAuth(app); 
  const navigate=useNavigate(); 
  const dispatch=useDispatch();  

  const SignOut=()=>{ 
    console.log("hello"); 
     firebaseAuth.signOut().then(()=>{ 
      dispatch(setUserNull());
     navigate('/login', {replace : true });   
     })
     .catch((err)=>{console.log(err)} );
  };


  return <header className="fixed backdrop-blur-md z-50 inset-x-0 top-0 flex items-center justify-between px-6 md:px-20 py-6"> 
    <NavLink to="/" className="flex items-center justify-center gap-4"> 
        <img src={Logo} className="w-12 " alt="" /> 
        <p className="font-semibold text-xl"> City</p>
    </NavLink> 
    <nav className="flex items-center justify-center gap-8">  
      <ul className=" hidden md:flex items-center justify-center gap-16">  
        <NavLink className={({isActive})=> isActive ? isActiveStyles : isNotActiveStyles } to="/" > Home</NavLink>
        <NavLink className={({isActive})=> isActive ? isActiveStyles : isNotActiveStyles }to="/menu" > Menu</NavLink>
        <NavLink className={({isActive})=> isActive ? isActiveStyles : isNotActiveStyles }to="/services" > Services</NavLink> 
        <NavLink className={({isActive})=> isActive ? isActiveStyles : isNotActiveStyles }to="/aboutus" > About-Us</NavLink>
      </ul> 
       <motion.div {...buttonClick} onClick={()=>dispatch(setCartOn())} className="relative cursor-pointer "> 
          <MdShoppingCart className="text-3xl  text-textColor "/>
          { cart?.length>0 && (<div className='w-6 h-6 rounded-full bg-red-500 flex  items-center justify-center absolute -top-4 -right-1 '> 
            <p className="text-primary text-base font-semibold "> {cart?.length} </p>
          </div> ) }
       </motion.div>
       {user ? <>
       <div className="relative cursor-pointer" 
          onMouseEnter={()=>setVisible(true)}
          onMouseLeave={ ()=>setVisible(false)}>  
         <div className="w-12 h-12 rounded-full shadow-md cursor-pointer overflow-hidden
          flex items-center justify-center "> 
          <motion.img className="w-full h-full object-cover src={user?.picture ? user?.picture : Avatar } "
          whileHover={{ scale:1.15 }}
          referrerPolicy='no-referrer ' />  
          </div> 
          {visible && <motion.div 
                 {...SlideTop}
                 onMouseLeave={()=>{setVisible(false) } } 
                 className="px-6 py-4 w-48 bg-lightOverlay backdrop-blur-md rounded-md 
                 shadow-md absolute top-12 right-0 flex flex-col gap-4 
            "> 
                <Link> 
                Dashboard
                </Link> 
                <Link> 
                My Profile </Link> 
                <Link> 
                Orders </Link> 
                <hr /> 
                <motion.button {...buttonClick} onClick={SignOut} className="group flex items-center justify-center 
                rounded-md px-3 py-2 shadow-md bg-red-100  hover:bg-red-300 gap-3
                ">  
                  <MdLogout className=" text-2xl text-textColor group-hover:: text-headingColor" >  
                  </MdLogout>
                  <p> SignOut </p>
                  </motion.button> 
            </motion.div>}  
        </div> </> : <>
        <NavLink to="/login"> 
          <motion.button {...buttonClick}  className="px-4 py-2 rounded-md shadow-md bg-lightOverlay border
          border-red-300 cursor-pointer "> 
           Login
          </motion.button>
        </NavLink>
        </>}
    </nav>
  </header>
}

export default Header