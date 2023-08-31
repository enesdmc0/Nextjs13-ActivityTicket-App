import React from 'react'
import {Separator} from "@/components/ui/separator";
import Card from "@/components/Card"
import prisma from "@/lib/prismadb"


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

    if (!activities) {
        return (
            <div>Aradığınız aktivite bulunamadı</div>
        )
    }
    return (
        <div className="mt-10 space-y-10 w-3/4 mx-auto">
            <div className="space-y-5">
                <h2 className="text-xl font-bold">Outdated Activities</h2>
              <Separator/>

                <div className="grid grid-cols-3 gap-5">
                    {activities.map(activity => (
                        <Card key={activity.id} activity={activity} isOutdated/>
                    ))}

                </div>
            </div>
            <Separator/>
        </div>
    )
}

export default Outdated