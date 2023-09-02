import React from 'react';
import {Separator} from "@/components/ui/separator";
import ActivityForm from "@/app/(root)/(routes)/activity/[activityId]/components/ActivityForm";
import prisma from "@/lib/prismadb"


const SettingsActivity = async ({params}: { params: { activityId: string } }) => {

    let id = "000000000000000000000000";


    const activity = await prisma?.activity.findUnique({
        where: {
            id: params.activityId === "new" ? id : params.activityId
        }
    })

    return (
        <div className="mt-10 space-y-10 w-full md:w-3/4 px-5 md:mx-auto">
            <div className="space-y-5">
                <ActivityForm initialData={activity}/>
            </div>
            <Separator/>
        </div>
    );
};

export default SettingsActivity;
