import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import DashboardLayout from "../Layout/DashboardLayout";
import Home from "../Home/Home";
import Bills from "../Pages/Bills";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PrivateRoute from "./PrivateRoute";
import BillDetails from "../Pages/BillDetails";
import MyPayBills from "../Pages/MyPayBills";
import NotFound from "../Pages/NotFound";
import Profile from "../Pages/Profile";
import Help from "../Pages/Help";
import AddBill from "../Pages/AddBill";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import DashboardPayments from "../Pages/Dashboard/DashboardPayments";
import DashboardProfile from "../Pages/Dashboard/DashboardProfile";
import DashboardAnalytics from "../Pages/Dashboard/DashboardAnalytics";
import DashboardSettings from "../Pages/Dashboard/DashboardSettings";

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
                path:'/add-bill',
                element:<AddBill></AddBill>
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
            {
                path: "/profile",
                element: (
                    <PrivateRoute>
                        <Profile />
                    </PrivateRoute>
                ),
            },
            {
                path: "/help",
                element: <Help />,
            },
        ]
    },
    {
        path: '/dashboard',
        element: (
            <PrivateRoute>
                <DashboardLayout />
            </PrivateRoute>
        ),
        children: [
            {
                index: true,
                element: <DashboardHome />
            },
            {
                path: 'payments',
                element: <DashboardPayments />
            },
            {
                path: 'analytics',
                element: <DashboardAnalytics />
            },
            {
                path: 'profile',
                element: <DashboardProfile />
            },
            {
                path: 'settings',
                element: <DashboardSettings />
            }
        ]
    },
    {
        path: '*',
        element: <NotFound></NotFound>
    }
])

export default router