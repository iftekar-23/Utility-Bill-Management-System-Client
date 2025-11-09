import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Home/Home";
import Bills from "../Pages/Bills";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PrivateRoute from "./PrivateRoute";
import BillDetails from "../Pages/BillDetails";
import MyPayBills from "../Pages/MyPayBills";
import NotFound from "../Pages/NotFound";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout></RootLayout>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: '/bills',
                element: <Bills></Bills>
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/bills/:id",
                element: (
                    <PrivateRoute>
                        <BillDetails />
                    </PrivateRoute>
                ),
            },
            {
                path: '/my-pay-bills',
                element: (
                    <PrivateRoute>
                        <MyPayBills />
                    </PrivateRoute>
                )
            },
        ]
    },
    {
        path:'*',
        element:<NotFound></NotFound>
    }
])

export default router