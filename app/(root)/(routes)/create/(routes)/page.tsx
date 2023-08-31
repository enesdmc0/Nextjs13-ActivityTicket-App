import React from 'react';
import SwiperPopulerActivities from "@/app/(root)/components/SwiperPopulerActivities";
import {Separator} from "@/components/ui/separator";
import ActivityForm from "@/app/(root)/(routes)/create/components/ActivityForm";

const CreateActivity = () => {
    return (
        <div className="mt-10 space-y-10 w-3/4 mx-auto">

            <div className="space-y-5">
                <h2 className="text-xl font-bold">Create Activity</h2>
                <Separator/>

                <ActivityForm/>
            </div>
            <Separator/>
        </div>
    );
};

export default CreateActivity;
