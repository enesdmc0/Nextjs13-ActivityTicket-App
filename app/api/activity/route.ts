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
            organizers,
            imagesUrl,
            latitude,
            longitude,
            address,
            isPopuler,
            isFree,
            price,
        } = await request.json()

        const images = imagesUrl.split(" ")
        const prices = price.split(" ")

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
                imagesURL: images,
                activityDate: dob,
                latitude,
                longitude,
                price: prices
            }
        })

        return NextResponse.json(activity)

    }catch (error) {
        console.log("[CREATE_ACTIVITY_ERROR]", error)
        return new NextResponse("Internal server error", {status: 500})
    }
}