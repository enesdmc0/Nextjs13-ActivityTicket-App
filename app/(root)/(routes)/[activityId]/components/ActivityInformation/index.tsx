import React from 'react';
import {Activity} from "@prisma/client";
import Link from "next/link";
import {
    Book,
    Calendar,
    ClipboardList,
    Clock3,
    Landmark,
    Map,
    MapPin,
    Monitor,
    Palmtree,
    Pi,
    Wallet
} from "lucide-react";


interface Props {
    activity: Activity
}

const ActivityInformation: React.FC<Props> = ({activity}) => {

    return (
        <div className="grid grid-cols-4 gap-5 dark:text-secondary">
            <div className="col-span-4 md:col-span-2 flex flex-col space-y-2">
                <span className="font-bold text-md border-b flex items-center gap-2">
                    <Monitor className="h-5 w-5"/>
                    Title
                </span>
                <span className="font-semibold text-sm ">{activity.title}</span>
            </div>
            <div className="col-span-4 md:col-span-2 flex flex-col space-y-2">
                <span className="font-bold text-md border-b flex items-center gap-2">
                    <Book className="h-5 w-5"/>
                    Description
                </span>
                <span className="font-semibold text-sm ">{activity.description}</span>
            </div>
            <div className="col-span-2 md:col-span-1 flex flex-col space-y-2">
                <span className="font-bold text-md border-b flex items-center gap-2">
                    <Pi className="w-5 h-5"/>
                    Category</span>
                <span className="font-semibold text-sm ">{activity.category}</span>
            </div>
            <div className="col-span-2 md:col-span-1 flex flex-col space-y-2">
                <span className="font-bold text-md border-b flex items-center gap-2">
                    <MapPin className="h-5 w-5"/>
                    City
                </span>
                <span className="font-semibold text-sm ">{activity.city}</span>
            </div>
            <div className="col-span-2 md:col-span-1 flex flex-col space-y-2">
                <span className="font-bold text-md border-b flex items-center gap-2">
                    <Palmtree className="h-5 w-5"/>
                    Place
                </span>
                <Link href={`/place/${activity.place}`}>
                    <span className="font-semibold text-sm  flex gap-2">{activity.place} <ClipboardList
                        className="h-5 w-5"/> </span>
                </Link>
            </div>
            {!activity.isFree && <div className="col-span-2 md:col-span-1 flex flex-col space-y-2">
                <span className="font-bold text-md border-b flex items-center gap-2">
                    <Wallet className="h-5 w-5"/>
                    Price</span>
                <span className="font-semibold text-sm ">
                     {activity.price} TL (Category A)
                </span>
            </div>}
            <div className="col-span-2 md:col-span-1 flex flex-col space-y-2">
                <span className="font-bold text-md border-b flex items-center gap-2">
                    <Calendar className="h-5 w-5"/>
                    Start Date</span>
                <span className="font-semibold text-sm ">{activity.activityDate.toDateString()}</span>
            </div>
            <div className="col-span-2 md:col-span-1 flex flex-col space-y-2">
                <span className="font-bold text-md border-b flex items-center gap-2">
                    <Clock3 className="h-5 w-5"/>
                    Time</span>
                <span className="font-semibold text-sm ">{activity.activityTime}</span>
            </div>
            <div className="col-span-2 md:col-span-1 flex flex-col space-y-2">
                <span className="font-bold text-md border-b flex items-center gap-2">
                    <Landmark className="h-5 w-5"/>
                    Organizers</span>
                <span className="font-semibold text-sm ">{activity.organizers}</span>
            </div>
            <div className="col-span-4 md:col-span-2 flex flex-col space-y-2">
                <span className="font-bold text-md border-b flex items-center gap-2">
                    <Map className="h-5 w-5"/>
                    Address</span>
                <span className="font-semibold text-sm ">{activity.address}</span>
            </div>
        </div>
    );
};

export default ActivityInformation;
