import React from 'react';
import SwiperDetail from "@/components/SwiperDetail";
import {redirect} from "next/navigation";
import prisma from "@/lib/prismadb";
import {Separator} from "@/components/ui/separator";
import Map from "@/components/Map";

const ActivityDetail = async ({params}: { params: { activityId: string } }) => {


    if (!params.activityId) {
        redirect("/")
    }

    const activity = await prisma?.activity.findUnique({
        where: {
            id: params.activityId
        }
    })

    if (!activity) {
        redirect("/")
    }

    return (
        <div className="mt-10 space-y-10 w-3/4 mx-auto">
            <div className="space-y-5">
                <h2 className="text-xl font-bold">{activity.title}</h2>
                <SwiperDetail activity={activity}/>
            </div>
            <Separator/>
            <Map/>
            <Separator/>
        </div>
    );
};

export default ActivityDetail;
