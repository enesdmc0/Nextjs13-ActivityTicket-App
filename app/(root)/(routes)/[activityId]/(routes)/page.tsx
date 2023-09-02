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
import Title from "@/components/Title";

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
        <div className="mt-10 space-y-10 w-full xl:w-3/4 px-5 xl:mx-auto">

            <div className="flex items-center justify-between">
                <Title title="Activity Detail" description="The time of the activity, the address, the price and more information." />
                <DeleteEditButtons/>
            </div>

            <Separator/>

            <div className="space-y-5">
                <div className="flex items-center justify-between">
                    <Title title={activity.title}/>
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
                <Title title="Activity Information" description="city, place, date, time,  address, organizers..." />
                <Separator/>
                <ActivityInformation activity={activity}/>
            </div>
            <Separator/>

            <SocialMediaIcons/>

            <Separator/>

            <div className="space-y-5">
                <Title title="Armchair Layout" description="You can fallow the activity from the place that suits you..." />
                <ChairLayout activity={activity}/>
            </div>

            <Separator/>

            <div className="space-y-5">
                <Title title="Activity Map" description="Find the location of the city of the activity..."/>
                <ClientOnly>
                    <Map latitude={activity.latitude} longitude={activity.longitude} />
                </ClientOnly>
            </div>

            <Separator/>

        </div>
    );
};

export default ActivityDetail;
