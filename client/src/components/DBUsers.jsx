import React from "react";
import { useDispatch, useSelector } from "react-redux"; 
import {getAllUsers } from "../api"; 
import { setAllUserDetails } from "../context/actions/allUsersActions";
import {useEffect } from "react"; 
const DBUsers = () => { 
  const allUsers=useSelector((state)=>state.allUsers); 
  const dispatch=useDispatch(); 
  useEffect(()=>{ 
     if(!allUsers){ 
      getAllUsers().then((data)=>{ 
        dispatch(setAllUserDetails(data));  
      });
     }
  },[]);
  return <div>DBUsers</div>;
};

export default DBUsers;
