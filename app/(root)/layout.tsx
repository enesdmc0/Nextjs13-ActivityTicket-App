import React from 'react';
import Navbar from "../../components/Navbar";

const RootLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar/>
            {children}
        </>
    );
};

export default RootLayout;
