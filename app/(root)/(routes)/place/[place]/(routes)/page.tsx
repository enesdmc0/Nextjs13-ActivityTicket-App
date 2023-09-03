import React from 'react';
import prisma from "@/lib/prismadb"
import {redirect} from "next/navigation";
import {Separator} from "@/components/ui/separator";
import Card from "@/components/Card"

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
        <div className="mt-10 space-y-10 w-3/4 mx-auto">
            <div className="space-y-5">
                <h2 className="text-xl font-bold">{params.place} Activities</h2>
                <Separator/>

                <div className="grid grid-cols-3 gap-5">
                    {activities.map(activity => (
                        <Card key={activity.id} activity={activity}/>
                    ))}

                </div>
            </div>
            <Separator/>
        </div>
    );
};

export default PlacePage;
