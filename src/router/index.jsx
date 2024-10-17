import {createBrowserRouter} from "react-router-dom";
import {lazy,Suspense} from 'react';
import HomePage from '../pages/HomePage.jsx'

const AboutPage=lazy(()=>import('../pages/AboutPage.jsx'));

const router=createBrowserRouter(
  [
    {
      path: "/",
      element:<HomePage/>
    },
    {
      path: "/about",
      element:<Suspense fallback={<>loading</>}><AboutPage/></Suspense>
    },
  ],
  {
    basename:'/idkwhodatis.github.io-react'
  }
);

export default router