"use client"
import React from 'react';
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {Atom, BookmarkMinus, Home, PlusCircle} from "lucide-react";


const MainNav = ({className, ...props}: React.HtmlHTMLAttributes<HTMLElement>) => {
    const pathname = usePathname()


    const routes = [
        {href: "/", Icon: <Home className="w-4 h-4"/> ,label: "Overview", active: pathname === "/"},
        {href: "/outdated", Icon: <BookmarkMinus className="w-4 h-4"/> ,label: "Outdated Activities", active: pathname === "/outdated"},
        {href: "/activity/new", Icon: <PlusCircle className="w-4 h-5"/> ,label: "Create Activity", active: pathname === "/activity/new"},
        {href: "/api", Icon: <Atom className="w-4 h-5"/> ,label: "API Document", active: pathname === "/api"},
    ]


    return (
        <div className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
            {routes.map((route) => (
                <Link href={route.href} key={route.href} className={cn("text-sm flex items-center gap-1 font-medium transition-colors hover:text-primary",
                route.active ? "text-black dark:text-white" : "text-muted-foreground")}>
                    {route.Icon}
                    <span>{route.label}</span>
                </Link>
            ))}
        </div>
    );
};

export default MainNav;
