"use client"
import SwiperHome from "@/components/SwiperHome";
import {Separator} from "@/components/ui/separator";
import {Input} from "@/components/ui/input";
import {DatePickerWithRange} from "@/components/ui/date-range-picker";
import {DatePickerForm} from "@/components/Datesearch";

export default function Home() {
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
                   <Input type="text" placeholder="Search activity..."  />
                   <DatePickerForm/>
               </div>
           </div>
            <Separator/>
            <div>

            </div>
        </div>
    )
}