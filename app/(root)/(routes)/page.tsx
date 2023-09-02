import prisma from "@/lib/prismadb"
import {Separator} from "@/components/ui/separator";
import SwiperPopulerActivities from "@/app/(root)/components/SwiperPopulerActivities";
import Filter from "@/app/(root)/components/Filter";
import Search from "@/app/(root)/components/Search";
import ActivityList from "@/app/(root)/components/ActivityList";
import getFilteredActivities from "@/actions/getFilteredActivities";
import ClientOnly from "@/components/ClientOnly";
import {redirect} from "next/navigation";
import Title from "@/components/Title";

const currentDate = new Date()

export default async function Home({searchParams}: { searchParams: { category: string, city: string, place: string, start: dateFns, end: dateFns } }) {

    //GET FILTERED ACTIVITIES
    const activities = await getFilteredActivities(searchParams.category, searchParams.city, searchParams.place, searchParams.start, searchParams.end)

    if (activities === null || activities === undefined) {
        redirect("/")
    }

    //GET ALL ACTIVITIES
    const allActivities = await prisma.activity.findMany({
        where: {
            activityDate: {
                gte: currentDate
            }
        }
    })

    //GET POPULER ACTIVITIES
    const populerActivities = await prisma?.activity.findMany({
        where: {
            isPopuler: true
        }
    })


    return (
        <div className="mt-10 space-y-10 w-3/4 mx-auto">

            <div className="space-y-5">
                <Title title="Populer Activities"/>
                <ClientOnly>
                    <SwiperPopulerActivities populerActivities={populerActivities}/>
                </ClientOnly>
            </div>

            <Separator/>

            <div className="space-y-5">
                <Title title="Activities Filter"/>
                <Filter activities={activities} allActivities={allActivities}/>
            </div>

            <Separator/>

            <div className="space-y-5">
                <Title title="Search Activities"/>
                <Search activities={activities}/>
            </div>

            <Separator/>

            <div className="space-y-5">
                <Title title="Activities"/>
                <ActivityList/>
            </div>

            <Separator/>
            <Separator/>
        </div>
    )
}