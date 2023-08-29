import React from 'react';
import Navbar from "../../components/Navbar";
import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";

const RootLayout = ({children}: { children: React.ReactNode }) => {
    const {userId} = auth()
    if (!userId) {
        redirect("/sign-in")
    }
    return (
        <>
            <Navbar/>
            {children}
        </>
    );
};

export default RootLayout;
