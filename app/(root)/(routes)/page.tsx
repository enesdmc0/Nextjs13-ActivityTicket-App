import prisma from "@/lib/prismadb"
import {Separator} from "@/components/ui/separator";
import SwiperPopulerActivities from "../components/SwiperPopulerActivities";
import Filter from "../components/Filter";
import Search from "../components/Search";
import ActivityList from "../components/ActivityList";
import getFilteredActivities from "@/actions/getFilteredActivities";

const currentDate = new Date()

export default async function Home({searchParams}: {searchParams : { category: string, city: string, place: string, start: dateFns, end: dateFns }}) {
    const activities = await getFilteredActivities(searchParams.category, searchParams.city, searchParams.place, searchParams.start, searchParams.end )
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


    if (!activities) {
        return (
            <div>Aradığınız aktivite bulunamadı</div>
        )
    }

    if (!populerActivities) {
        return (
            <div>Populer aktivite bulunamadı</div>
        )
    }

    return (
        <div className="mt-10 space-y-10 w-3/4 mx-auto">

            <div className="space-y-5">
                <h2 className="text-xl font-bold">Populer Activities</h2>
                <SwiperPopulerActivities populerActivities={populerActivities}/>
            </div>

            <Separator/>

            <div className="space-y-5">
                <h2 className="text-xl font-bold">Filter Activities</h2>
                <Filter activities={activities} allActivities={allActivities}/>
            </div>

            <Separator/>

            <div className="space-y-5">
                <h2 className="text-xl font-bold">Search Activities</h2>
                <Search activities={activities} />
            </div>

            <Separator/>

            <div className="space-y-5">
                <h2 className="text-xl font-bold">Activities</h2>
               <ActivityList/>
            </div>

            <Separator/>
            <Separator/>
        </div>
    )
}