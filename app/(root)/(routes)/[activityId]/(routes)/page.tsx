import React from 'react';
import SwiperDetail from "@/components/SwiperDetail";
import {redirect} from "next/navigation";
import prisma from "@/lib/prismadb";
import {Separator} from "@/components/ui/separator";
import Map from "@/components/Map";
import {Badge} from "@/components/ui/badge";
import ActivityContens from "@/components/ActivityContens";
import {Armchair} from "lucide-react";
import ChairLayout from "@/components/ChairLayout";

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
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">{activity.title}</h2>
                    <div className="space-x-5">
                        {activity.isFree && <Badge>Free</Badge>}
                        {activity.isPopuler && <Badge>Populer</Badge>}
                    </div>
                </div>
                <SwiperDetail activity={activity}/>
            </div>
            <Separator/>
            <ActivityContens activity={activity}/>
            <Separator/>
            <Map/>
            <Separator/>
            <div className="space-y-5">
                <h2 className="text-xl font-bold">Oturma Düzeni</h2>
                <ChairLayout/>
            </div>
        </div>
    );
};

export default ActivityDetail;
