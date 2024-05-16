import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Login from './components/Login.jsx'
import Home from './components/Home.jsx'
import SignUp from './components/SignUp.jsx'
import { FirebaseProvider } from './context/Firebase.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'


const appRouter= createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Login/>
      },
      {
        path:'/home',
        element:<Home/>
      },
      {
        path:"/signup",
        element:<SignUp/>
      }
    ]
  },
  
])

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode >
    <FirebaseProvider>
    <RouterProvider router={appRouter}>
    <App />
    </RouterProvider>
    </FirebaseProvider>
  </React.StrictMode>,
)
