import {createBrowserRouter,RouterProvider,Route,Link} from "react-router-dom";
import HomePage from '../pages/HomePage.jsx'

const router=createBrowserRouter([
    {
        path: "/",
        element:<HomePage/>,
    },
    {
        path: "about",
        element: <div>About</div>,
    },
]);

export default router