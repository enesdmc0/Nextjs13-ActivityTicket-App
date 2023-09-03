import React from 'react'
import {Separator} from "@/components/ui/separator";
import Card from "@/components/Card"
import prisma from "@/lib/prismadb"
import ActivityNotFound from "@/components/ActivityNotFound";
import Title from "@/components/Title";


const Outdated = async () => {
    const currentDate = new Date();

    //GET OUTDATED ACTIVITIES
    const activities = await prisma?.activity.findMany({
        where: {
            activityDate: {
                lt: currentDate
            }
        },
        include: {
            images: true
        }
    })


    return (
        <div className="mt-10 space-y-10 w-full xl:w-3/4 px-5 xl:mx-auto">
            <div className="space-y-5">
                <Title title="Outdated Activities"
                       description={`${currentDate.toDateString()} Activities before`}/>
                <Separator/>
                {activities.length === 0
                    ? (<ActivityNotFound description="No overdue activity found."/>)
                    : (<div className="grid grid-cols-3 gap-5">
                        {activities.map(activity => (
                            <div key={activity.id} className="col-span-3 md:col-span-2  xl:col-span-1">
                                <Card  activity={activity} isOutdated/>
                            </div>
                        ))}
                    </div>)
                }


            </div>
            <Separator/>
        </div>
    )
}

export default Outdated