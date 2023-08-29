import SwiperHome from "@/components/SwiperHome";
import {Separator} from "@/components/ui/separator";
import {Input} from "@/components/ui/input";
import {DatePickerForm} from "@/components/Datesearch";
import Card from "@/components/Card"
import prisma from "@/lib/prismadb"

export default async function Home() {
    const activities = await prisma?.activity.findMany()

    if (!activities) {
        return (
            <div>Aradığınız aktivite bulunamadı</div>
        )
    }

    return (
        <div className="mt-10 space-y-10 w-3/4 mx-auto">
            <div className="space-y-5">
                <h2 className="text-xl font-bold">Populer Activities</h2>
                <SwiperHome/>
            </div>
            <Separator/>
            <div className="space-y-5">
                <h2 className="text-xl font-bold">Search Activities</h2>
                <div className="flex gap-12">
                    <Input type="text" placeholder="Search activity..."/>
                    <DatePickerForm/>
                </div>
            </div>
            <Separator/>
            <div className="grid grid-cols-3 gap-5">
                {
                    activities.map(activity => (
                        <Card key={activity.id} activity={activity} />
                    ))
                }

            </div>
            <Separator/>
            <Separator/>
        </div>
    )
}