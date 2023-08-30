import React from 'react';
import {Separator} from "@/components/ui/separator";
import {Activity} from "@prisma/client";

interface Props {
    activity: Activity
}

const ActivityContens: React.FC<Props> = ({activity}) => {
    return (
        <div className="space-y-5">
            <h2 className="text-xl font-bold">Aktivity Contens</h2>
            <Separator/>
            <div className="grid grid-cols-4 gap-5">
                <div className="flex flex-col space-y-2">
                    <span className="font-bold text-md">Title</span>
                    <span>{activity.title}</span>
                </div>
                <div className="flex flex-col space-y-2">
                    <span className="font-bold text-md">Description</span>
                    <span>{activity.description}</span>
                </div>
                <div className="flex flex-col space-y-2">
                    <span className="font-bold text-md">Category</span>
                    <span>{activity.category}</span>
                </div>
                <div className="flex flex-col space-y-2">
                    <span className="font-bold text-md">City</span>
                    <span>{activity.city}</span>
                </div>
                <div className="flex flex-col space-y-2">
                    <span className="font-bold text-md">Place</span>
                    <span>{activity.place}</span>
                </div>
                <div className="flex flex-col space-y-2">
                    <span className="font-bold text-md">Start Date</span>
                    <span>{activity.startDate.toISOString().split("T")[0]}</span>
                </div>
                <div className="flex flex-col space-y-2">
                    <span className="font-bold text-md">End Date</span>
                    <span>{activity.endDate.toISOString().split("T")[0]}</span>
                </div>
                <div className="flex flex-col space-y-2">
                    <span className="font-bold text-md">Address</span>
                    <span>{activity.address}</span>
                </div>
                {!activity.isFree && <div className="flex flex-col space-y-2">
                    <span className="font-bold text-md">Price</span>
                    <span>{activity.price}</span>
                </div>}
            </div>
        </div>
    );
};

export default ActivityContens;
