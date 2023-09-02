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
        }
    })


    return (
        <div className="mt-10 space-y-10 w-3/4 mx-auto">
            <div className="space-y-5">
                <Title title="Outdated Activities"
                       description={`${currentDate.toDateString()} Activities before`}/>
                <Separator/>
                {activities.length === 0
                    ? (<ActivityNotFound description="No overdue activity found."/>)
                    : (<div className="grid grid-cols-3 gap-5">
                        {activities.map(activity => (
                            <Card key={activity.id} activity={activity} isOutdated/>
                        ))}
                    </div>)
                }


            </div>
            <Separator/>
        </div>
    )
}

export default Outdated