import SwiperHome from "@/components/SwiperHome";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import Card from "@/components/Card"
import prisma from "@/lib/prismadb"
import {DatePickerWithRange} from "@/components/ui/date-range-picker";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Button} from "@/components/ui/button";

export default async function Home() {
    const currentDate = new Date();
    const activities = await prisma?.activity.findMany({
        where: {
            endDate: {
                gte: currentDate
            }
        }
    })
    const populerActivities = await prisma?.activity.findMany({
        where: {
            isPopuler: true
        }
    })
    let categories: any = [];
    let cities: any = [];
    let places: any = [];
    if (activities) {
        const uniqueCategories = new Set(activities.map(activity => activity.category));
        categories = Array.from(uniqueCategories);
        const uniqueCities = new Set(activities.map(activity => activity.city));
        cities = Array.from(uniqueCities);
        const uniquePlaces = new Set(activities.map(activity => activity.place));
        places = Array.from(uniquePlaces);
    }

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
                <SwiperHome populerActivities={populerActivities} />
            </div>
            <Separator />
            <div className="space-y-5">
                <h2 className="text-xl font-bold">Filter Activities</h2>
                <div className="flex gap-12">
                    <DatePickerWithRange/>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((category: string) => (
                                <SelectItem key={category} value="category">{category}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="City" />
                        </SelectTrigger>
                        <SelectContent>
                            {cities.map((city: string) => (
                                <SelectItem key={city} value="category">{city}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Place" />
                        </SelectTrigger>
                        <SelectContent>
                            {places.map((place: string) => (
                                <SelectItem key={place} value="category">{place}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button>Search</Button>
                </div>
            </div>
            <Separator />
            <Input type="text" placeholder="Search activity..." />
            <div className="grid grid-cols-3 gap-5">
                {
                    activities.map(activity => (
                        <Card key={activity.id} activity={activity} />
                    ))
                }

            </div>
            <Separator />
            <Separator />
        </div>
    )
}