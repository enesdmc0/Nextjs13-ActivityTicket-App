import prisma from "@/lib/prismadb";
import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs";


//UPDATE ACTIVITY
export async function PATCH(request: Request, {params}: { params: { activityId: string } }) {
    try {
        const {userId} = auth()

        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401})
        }

        if (!params.activityId) {
            return new NextResponse("Activity ID is required", {status: 403})
        }

        const {
            title,
            description,
            category,
            city,
            place,
            dob,
            organizers,
            images,
            activityTime,
            latitude,
            longitude,
            address,
            isPopuler,
            isFree,
            price,
        } = await request.json()


        await prisma?.activity.update({
            where: {
                id: params.activityId
            },
            data: {
                title,
                description,
                category,
                city,
                place,
                organizers,
                address,
                isPopuler,
                isFree,
                images: {
                    deleteMany: {}
                },
                activityDate: dob,
                activityTime,
                latitude,
                longitude,
                price
            }
        })

        const activity = await prisma.activity.update({
            where: {
                id: params.activityId
            },
            data: {
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: { url: string }) => image)
                        ]
                    }
                }
            }
        })

        return NextResponse.json(activity)

    } catch (error) {
        console.log("[PATCH_ACTIVITY_ERROR]", error)
        return new NextResponse("Internal Server error", {status: 500})
    }

}


//DELETE ACTIVITY
export async function DELETE(request: Request, {params}: { params: { activityId: string } }) {
    try {

        const {userId} = auth()

        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401})
        }

        if (!params.activityId) {
            return new NextResponse("Activity ID is required", {status: 403})
        }

        const activity = await prisma.activity.deleteMany({
            where: {
                id: params.activityId
            }
        })

        return NextResponse.json(activity)

    } catch (error) {
        console.log("[DELETE_ACTIVITY_ERROR]", error)
        return new NextResponse("Internal Server error", {status: 500})
    }
}

//GET ACTIVITIY
export async function GET(request: Request, {params}: { params: { activityId: string } }) {
    try {

        if (!params.activityId) {
            return new NextResponse("Activity ID is required", {status: 403})
        }

        const activities = await prisma.activity.findMany({
            where: {
                id: params.activityId
            }
        })

        return NextResponse.json(activities)

    } catch (error) {
        console.log("[GET_ACTIVITY_ERROR]", error)
        return new NextResponse("Internal server error", {status: 500})
    }
}