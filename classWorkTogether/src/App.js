import React from 'react';
import Register from './components/Register';
import Login from './components/Login'
import './components/App.css';


import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";


  const router = createBrowserRouter([

        {
            path: "/",
            element:  <Register/>
        },
        {
            path: "/Login",
            element: <Login/>
        },

      ]);




const App = () => {
   
  return (
    
    <>
    
        <div className='App'>
            <RouterProvider router={router} />
        </div>
    
    </>
  )
}


export default App