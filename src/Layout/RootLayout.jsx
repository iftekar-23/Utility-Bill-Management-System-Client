import React from 'react';
import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";

import Navbar from '../Component/Navbar';
import Footer from '../Component/Footer';

const RootLayout = () => {
    return (
        <div>
            <div className="max-w-7xl mx-auto">
                <Navbar />
                <div className="mt-4">
                    <Outlet />
                </div>
                <Footer />
            </div>

            <Toaster />
        </div>
    );
};

export default RootLayout;