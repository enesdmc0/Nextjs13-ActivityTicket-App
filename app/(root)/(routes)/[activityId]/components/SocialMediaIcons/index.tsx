import React from 'react';
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import {GithubIcon, InstagramIcon, LinkedinIcon, TwitterIcon} from "lucide-react";


const SocialMediaIcons = () => {
    return (
        <div className="flex items-center justify-end gap-5">
            <Link href="https://www.instagram.com/" target="_blank" className={buttonVariants({variant: "default"})}>
                <InstagramIcon className="h-6 w-6"/>
            </Link>
            <Link href="https://twitter.com/" className={buttonVariants({variant: "default"})}>
                <TwitterIcon className="h-6 w-6"/>
            </Link>
            <Link href="https://github.com/" className={buttonVariants({variant: "default"})}>
                <GithubIcon className="h-6 w-6"/>
            </Link>
            <Link href="https://linkedin.com/" className={buttonVariants({variant: "default"})}>
                <LinkedinIcon className="h-6 w-6"/>
            </Link>
        </div>
    );
};

export default SocialMediaIcons;
