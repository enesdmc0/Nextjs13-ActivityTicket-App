import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs";
import prisma from "@/lib/prismadb";


const data = [
    {city: "istanbul", latitude: "41.015137", longitude: "28.979530"},
    {city: "roma", latitude: "41.902782", longitude: "12.496366"},
    {city: "new york", latitude: "40.730610", longitude: "-73.935242"},
    {city: "paris", latitude: "48.864716", longitude: "2.349014"},
    {city: "tokyo", latitude: "35.652832", longitude: "139.839478"},
]

//CREATE ACTIVITY
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
            images,
            address,
            isPopuler,
            isFree,
            price,
        } = await request.json()

        // if (!images && !images.length) {
        //     return new NextResponse(Images)
        // }

        let latitude;
        let longitude;

        switch (city) {
            case "istanbul":
                latitude = data[0].latitude;
                longitude = data[0].longitude;
                break;
            case "roma":
                latitude = data[1].latitude;
                longitude = data[1].longitude;
                break
            case "new york":
                latitude = data[2].latitude;
                longitude = data[2].longitude;
                break;
            case "paris":
                latitude = data[3].latitude;
                longitude = data[3].longitude;
                break;
            case "tokyo":
                latitude = data[4].latitude;
                longitude = data[4].longitude;
                break
            default:
                latitude = data[0].latitude;
                longitude = data[0].longitude;
        }

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
                activityTime,
                activityDate: dob,
                latitude,
                longitude,
                price,
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: {url: string}) => image)
                        ]
                    }
                }
            }
        })

        return NextResponse.json(activity)

    } catch (error) {
        console.log("[CREATE_ACTIVITY_ERROR]", error)
        return new NextResponse("Internal server error", {status: 500})
    }
}


//GET ALL ACTIVITIES
export async function GET(request: Request) {
    try {

        const activities = await prisma.activity.findMany()

        return NextResponse.json(activities)

    } catch (error) {
        console.log("[GET_ACTIVITY_ERROR]", error)
        return new NextResponse("Internal server error", {status: 500})
    }
}