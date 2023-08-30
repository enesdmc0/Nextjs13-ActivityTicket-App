import React from 'react';
import {Activity} from "@prisma/client";

interface Props {
    activity: Activity
}

const ActivityInformation: React.FC<Props> = ({activity}) => {

    return (
        <div className="grid grid-cols-4 gap-5">

            <div className="col-span-1 flex flex-col space-y-2">
                <span className="font-bold text-md border-b">Title</span>
                <span className="font-semibold text-sm text-gray-900">{activity.title}</span>
            </div>
            <div className="col-span-3 flex flex-col space-y-2">
                <span className="font-bold text-md border-b">Description</span>
                <span className="font-semibold text-sm text-gray-900">{activity.description}</span>
            </div>
            <div className="flex flex-col space-y-2">
                <span className="font-bold text-md border-b">Category</span>
                <span className="font-semibold text-sm text-gray-900">{activity.category}</span>
            </div>
            <div className="flex flex-col space-y-2">
                <span className="font-bold text-md border-b">City</span>
                <span className="font-semibold text-sm text-gray-900">{activity.city}</span>
            </div>
            <div className="flex flex-col space-y-2">
                <span className="font-bold text-md border-b">Place</span>
                <span className="font-semibold text-sm text-gray-900">{activity.place}</span>
            </div>
            {!activity.isFree && <div className="flex flex-col space-y-2">
                <span className="font-bold text-md border-b">Price</span>
                <span className="font-semibold text-sm text-gray-900">{activity.price}</span>
            </div>}
            <div className="flex flex-col space-y-2">
                <span className="font-bold text-md border-b">Start Date</span>
                <span className="font-semibold text-sm text-gray-900">{activity.startDate.toISOString().split("T")[0]}</span>
            </div>
            <div className="flex flex-col space-y-2">
                <span className="font-bold text-md border-b">End Date</span>
                <span className="font-semibold text-sm text-gray-900">{activity.endDate.toISOString().split("T")[0]}</span>
            </div>
            <div className="col-span-2 flex flex-col space-y-2">
                <span className="font-bold text-md border-b">Address</span>
                <span className="font-semibold text-sm text-gray-900">{activity.address}</span>
            </div>
        </div>
    );
};

export default ActivityInformation;
