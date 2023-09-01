import React from 'react';
import {redirect} from "next/navigation";
import prisma from "@/lib/prismadb";

import {Separator} from "@/components/ui/separator";
import {Badge} from "@/components/ui/badge";

import SwiperActivityDetail from "../components/SwiperActivityDetail";
import Map from "../components/Map";
import ActivityInformation from "../components/ActivityInformation";
import ChairLayout from "../components/ChairLayout";
import SocialMediaIcons from "@/app/(root)/(routes)/[activityId]/components/SocialMediaIcons";
import ClientOnly from "@/components/ClientOnly";
import DeleteEditButtons from "@/app/(root)/(routes)/[activityId]/components/DeleteEditButtons";
import {BadgeCheck, Coins} from "lucide-react";

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
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Activity Detail</h2>
                <DeleteEditButtons/>
            </div>
            <Separator/>

            <div className="space-y-5">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">{activity.title}</h2>
                    <div className="space-x-5">
                        {activity.isFree && <Badge>
                            <Coins className="w-4 h-4 mr-1"/>
                            Free
                        </Badge>}
                        {activity.isPopuler && <Badge>
                            <BadgeCheck className="w-4 h-4 mr-1"/>
                            Populer
                        </Badge>}
                    </div>
                </div>
                <ClientOnly>
                    <SwiperActivityDetail activity={activity}/>
                </ClientOnly>
            </div>

            <Separator/>

            <div className="space-y-5">
                <h2 className="text-xl font-bold">Activity Information</h2>
                <Separator/>
                <ActivityInformation activity={activity}/>
            </div>
            <Separator/>

            <SocialMediaIcons/>

            <Separator/>

            <div className="space-y-5">
                <h2 className="text-xl font-bold">Armchair Layout</h2>
                <ChairLayout activity={activity}/>
            </div>

            <Separator/>

            <div className="space-y-5">
                <h2 className="text-xl font-bold">Activity Map</h2>
                <ClientOnly>
                    <Map latitude={activity.latitude} longitude={activity.longitude} />
                </ClientOnly>
            </div>

            <Separator/>

        </div>
    );
};

export default ActivityDetail;
