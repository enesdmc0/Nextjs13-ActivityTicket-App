import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs";
import prisma from "@/lib/prismadb";


export async function POST(request: Request) {
    try {
        const {userId} = auth()

        if (!userId) {
            return new NextResponse("Unauthenticated", {status: 403})
        }

        const {
            title,
            description,
            category,
            city,
            place,
            dob,
            activityTime,
            organizers,
            imageUrl,
            latitude,
            longitude,
            address,
            isPopuler,
            isFree,
            price,
        } = await request.json()


        const activity = await prisma?.activity.create({
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
                activityTime,
                activityDate: dob,
                latitude,
                longitude,
                price
            }
        })

        return NextResponse.json(activity)

    }catch (error) {
        console.log("[CREATE_ACTIVITY_ERROR]", error)
        return new NextResponse("Internal server error", {status: 500})
    }
}