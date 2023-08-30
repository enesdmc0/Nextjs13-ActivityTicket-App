import prisma from "@/lib/prismadb"
import {Separator} from "@/components/ui/separator";
import SwiperPopoulerActivities from "../components/SwiperPopulerActivities";
import Filter from "../components/Filter";
import Search from "../components/Search";
import ActivityList from "../components/ActivityList";


export default async function Home() {
    const currentDate = new Date();
    //GET ALL ACTIVITIES
    const activities = await prisma?.activity.findMany({
        where: {
            endDate: {
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
                <SwiperPopoulerActivities populerActivities={populerActivities}/>
            </div>

            <Separator/>

            <div className="space-y-5">
                <h2 className="text-xl font-bold">Filter Activities</h2>
                <Filter activities={activities}/>
            </div>

            <Separator/>

            <div className="space-y-5">
                <h2 className="text-xl font-bold">Search Activities</h2>
                <Search/>
            </div>

            <Separator/>

            <div className="space-y-5">
                <h2 className="text-xl font-bold">Activities</h2>
               <ActivityList activities={activities}/>
            </div>

            <Separator/>
            <Separator/>
        </div>
    )
}