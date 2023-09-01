import prisma from "@/lib/prismadb";
import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs";

export async function PATCH(request: Request, {params}: {params: {activityId: string}}){
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
            imageUrl,
            activityTime,
            latitude,
            longitude,
            address,
            isPopuler,
            isFree,
            price,
        } = await request.json()


        const activity = await prisma?.activity.updateMany({
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
                imageUrl,
                activityDate: dob,
                activityTime,
                latitude,
                longitude,
                price
            }
        })

        return NextResponse.json(activity)

    }catch (error) {
        console.log("[PATCH_ACTIVITY_ERROR]", error)
        return new NextResponse("Internal Server error", {status: 500})
    }

}