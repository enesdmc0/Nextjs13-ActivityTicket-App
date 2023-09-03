import prisma from "@/lib/prismadb";


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
                },
                include: {
                    images: true
                }
            })

            if (!activities) {
                return null
            }

            return activities

        }

        const activities = await prisma?.activity.findMany({
            where: {
                activityDate: {
                    gte: currentDate
                }
            },
            include: {
                images: true
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