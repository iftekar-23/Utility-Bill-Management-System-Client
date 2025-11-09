import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Home/Home";
import Bills from "../Pages/Bills";

const router = createBrowserRouter([
    {
        path:'/',
        element:<RootLayout></RootLayout>,
        children:[
            {
                index:true,
                element:<Home></Home>
            },
            {
                path:'/bills',
                element:<Bills></Bills>
            }
        ]
    }
])

export default router