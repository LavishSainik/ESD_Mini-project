import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Layout from './Layout'
import Home from './components/Home/Home'
import Course from './components/course/Course'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Dashboard from './components/Dashboard/dashboard'
import TaList from './components/taList/TaList'
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path:"",
          element: <Home />
        },
        {
          path: "/dashboard/:facultyId",
          element:<Dashboard/>
        },
        {
          path: "/course/:facultyId/:courseId", // Add this route for the Course component
          element: <Course />
        },
        {
          path: "/TaList/:facultyId/:courseId", // Add this route for the Course component
          element: <TaList />
        }
        
      ]
    }
  ]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
