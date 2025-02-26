import {getAuth } from "firebase/auth";
import { app } from "./config/firebase.config";
import React, { use } from "react";
import { Route, Routes } from "react-router-dom";
import { Login, Main } from "./containers";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { validateUserJWTToken } from "./api";
import { setUserDetails } from "./context/actions/userActions";
import { motion } from "framer-motion";
import { FadeInOut } from "./animations";
const App = () => { 
  const firebaseAuth = getAuth(app);
  const[isLoading,setIsLoading]=React.useState(false); 
const dispatch=useDispatch();
  useEffect(()=>{ 
    setIsLoading(true); 
   firebaseAuth.onAuthStateChanged((cred,user) => {
           console.log("User is authenticated:", user);
           if (cred) {
             cred.getIdToken().then((token) => {
               console.log(token);
               validateUserJWTToken(token).then((data) => {
              
                dispatch(setUserDetails(data)); 
               });
             });
           }
         });
  },[])
  return (
    //tailwind css styling classes added below
    <div className="w-screen min-h-screen h-auto flex flex-col items-center justify-center">
      {/* this is the syntax of a JSX comment */}

      {/*
    The Routes component wraps all the route definitions. 
    The Route defines a route that matches the given path and renders the component given as element.
    */}

      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
