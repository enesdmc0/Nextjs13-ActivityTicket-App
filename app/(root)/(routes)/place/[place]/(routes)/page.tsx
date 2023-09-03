import React from 'react';
import prisma from "@/lib/prismadb"
import {redirect} from "next/navigation";
import {Separator} from "@/components/ui/separator";
import Card from "@/components/Card"
import Title from "@/components/Title";

const PlacePage = async ({params}: { params: { place: string } }) => {
    const activities = await prisma.activity.findMany({
        where: {
            place: params.place
        },
        include: {
            images: true
        }
    })

    if (!activities) {
        redirect("/")
    }

    return (
        <div className="mt-10 space-y-10 w-full xl:w-3/4 px-5 xl:mx-auto">
            <div className="space-y-5">
                <Title title={`${params.place} Activities`}
                       description={`${params.place} of the stadium venue`}/>
                <Separator/>

                <div className="grid grid-cols-6 gap-5">
                    {activities.map(activity => (
                        <div key={activity.id} className="col-span-6 sm:col-span-3  xl:col-span-2">
                            <Card activity={activity}/>
                        </div>
                    ))}

                </div>
            </div>
            <Separator/>
        </div>

    );
};

export default PlacePage;
