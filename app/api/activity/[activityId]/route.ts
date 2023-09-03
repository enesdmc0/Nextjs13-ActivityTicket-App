import prisma from "@/lib/prismadb";
import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs";

const data = [
    {city: "istanbul", latitude: "41.015137", longitude: "28.979530"},
    {city: "roma", latitude: "41.902782", longitude: "12.496366"},
    {city: "new york", latitude: "40.730610", longitude: "-73.935242"},
    {city: "paris", latitude: "48.864716", longitude: "2.349014"},
    {city: "tokyo", latitude: "35.652832", longitude: "139.839478"},
]

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
            address,
            isPopuler,
            isFree,
            price,
        } = await request.json()

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