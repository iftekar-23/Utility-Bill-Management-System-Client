import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";

const router = createBrowserRouter([
    {
        path:'/',
        element:<RootLayout></RootLayout>,
        children:[
            {

            }
        ]
    }
])

export default router