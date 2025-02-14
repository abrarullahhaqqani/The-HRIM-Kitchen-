import React from 'react'
import {Route,Routes} from 'react-router-dom'
import { Login, Main } from './containers';

const App = () => {
  return (
    //tailwind css styling classes added below
  <div className="w-screen min-h-screen h-auto flex flex-col items-center justify-center">

    {/* this is the syntax of a JSX comment */}

    {/*
    The Routes component wraps all the route definitions. 
    The Route defines a route that matches the given path and renders the component given as element.
    */}
  
    <Routes>
      <Route path="/*" element={<Main />}/>
      <Route path="/login" element={<Login />}/>
    </Routes>
    
  </div>
  );
  
};

export default App;
