import prisma from "@/lib/prismadb";
import {NextResponse} from "next/server";


export default async function getFilteredActivities(category: string, city: string, place: string, startDate: any, endDate: any) {
    try {

        const currentDate = new Date()


        if (category && city && place && startDate && endDate) {
            const stringStartDate = new Date(startDate)
            const stringEndDate = new Date(endDate)

            const activities = await prisma.activity.findMany({
                where: {
                    category,
                    city,
                    place,
                    activityDate: {
                        gte: stringStartDate,
                        lte: stringEndDate
                    }
                }
            })

            return activities

        }

        const activities = await prisma?.activity.findMany({
            where: {
                activityDate: {
                    gte: currentDate
                }
            }
        })




        if (!activities) {
            return null
        }

        return activities


    }catch (error) {
        console.log(error)
    }
}