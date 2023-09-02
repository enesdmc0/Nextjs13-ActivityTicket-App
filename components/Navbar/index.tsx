import React from 'react';
import {UserButton} from "@clerk/nextjs";
import MainNav from "../MainNav";
import ThemeToggle from "@/components/ThemeToggle";

const Navbar = () => {
    return (
        <div className="border-b pr-10">
           <div className="flex items-center h-16 px-4">
               <MainNav className="mx-6"/>
               <div className="ml-auto flex items-center space-x-4">
                   <ThemeToggle/>
                   <UserButton afterSignOutUrl="/"/>
               </div>
           </div>
        </div>
    );
};

export default Navbar;
