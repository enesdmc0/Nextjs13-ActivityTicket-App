import React from 'react';
import {Activity} from "@prisma/client";
import Card from "@/components/Card"
interface Props {
    activities: Activity[]
}

const ActivityList: React.FC<Props> = ({activities}) => {
    return (
        <div className="grid grid-cols-3 gap-5">
            {
                activities.map(activity => (
                    <Card key={activity.id} activity={activity}/>
                ))
            }

        </div>
    );
};

export default ActivityList;
