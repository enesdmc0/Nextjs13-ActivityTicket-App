"use client"
import React from 'react';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {Activity} from "@prisma/client";
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"
import {useRouter} from "next/navigation";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {CalendarIcon} from "lucide-react";
import {Calendar} from "@/components/ui/calendar";

interface Props {
    activities: Activity[]
    allActivities: Activity[]

}

const formSchema = z.object({
    category: z.string(),
    city: z.string(),
    place: z.string(),
    datePicker: z.object({
        from: z.date(),
        to: z.date(),
    }),
})
type FilterValues = z.infer<typeof formSchema>

const Filter: React.FC<Props> = ({activities, allActivities}, className: React.HTMLAttributes<HTMLDivElement>) => {
    const router = useRouter()
    const today = new Date()
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1)
    const dateRange = {
        from: today,
        to: tomorrow,
    };
    const form = useForm<FilterValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            category: undefined,
            city: undefined,
            place: undefined,
            datePicker: dateRange
        }
    })

    let categories: any = [];
    let cities: any = [];
    let places: any = [];
    if (activities) {
        const uniqueCategories = new Set(allActivities.map(activity => activity.category));
        categories = Array.from(uniqueCategories);
        const uniqueCities = new Set(allActivities.map(activity => activity.city));
        cities = Array.from(uniqueCities);
        const uniquePlaces = new Set(allActivities.map(activity => activity.place));
        places = Array.from(uniquePlaces);
    }


    const onSubmit = (data: FilterValues) => {
        router.push(`/?category=${data.category}&city=${data.city}&place=${data.place}&start=${data.datePicker.from.toDateString()}&end=${data.datePicker.to.toDateString()}`, {scroll: false})
    }



    const handleReset = () => {
        router.push("/", {scroll: false})
        form.reset({
            category: undefined,
            city: undefined,
            place: undefined,
            datePicker: dateRange
        });

    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-6 gap-4">

                       <div className="col-span-2">
                           <FormField
                               control={form.control}
                               name="datePicker"
                               render={({field}) => (
                                   <FormItem>
                                       <div className={cn("grid gap-2", className)}>
                                           <Popover>
                                               <PopoverTrigger asChild>
                                                   <FormControl>
                                                       <Button
                                                           id="date"
                                                           variant={"outline"}
                                                           className={cn(
                                                               "w-[300px] justify-start text-left font-normal",
                                                               !field.value && "text-muted-foreground"
                                                           )}
                                                       >
                                                           <CalendarIcon className="mr-2 h-4 w-4" />
                                                           {field.value?.from ? (
                                                               field.value.to ? (
                                                                   <>
                                                                       {format(field.value.from, "LLL dd, y")} -{" "}
                                                                       {format(field.value.to, "LLL dd, y")}
                                                                   </>
                                                               ) : (
                                                                   format(field.value.from, "LLL dd, y")
                                                               )
                                                           ) : (
                                                               <span>Pick a date</span>
                                                           )}
                                                       </Button>
                                                   </FormControl>
                                               </PopoverTrigger>
                                               <PopoverContent className="w-auto p-0" align="start">
                                                   <Calendar
                                                       initialFocus
                                                       mode="range"
                                                       selected={field.value}
                                                       onSelect={field.onChange}
                                                       numberOfMonths={2}
                                                   />
                                               </PopoverContent>
                                           </Popover>
                                       </div>
                                       <FormMessage/>
                                   </FormItem>
                               )}
                           />
                       </div>


                        <div className="col-span-1">
                            <FormField
                                control={form.control}
                                name="category"
                                render={({field}) => (
                                    <FormItem>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value} placeholder="Category"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {categories.map((category: string) => (
                                                    <SelectItem key={category}
                                                                value={category}
                                                    >{category}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="col-span-1">
                            <FormField
                                control={form.control}
                                name="city"
                                render={({field}) => (
                                    <FormItem>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="City"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {cities.map((city: string) => (
                                                    <SelectItem key={city}
                                                                value={city}
                                                    >{city}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>

                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="col-span-1">
                            <FormField
                                control={form.control}
                                name="place"
                                render={({field}) => (
                                    <FormItem>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Place"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {places.map((place: string) => (
                                                    <SelectItem key={place}
                                                                value={place}
                                                    >{place}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>

                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                       <div className="space-x-2">
                           <Button onClick={handleReset} variant="secondary" type="reset">Reset</Button>
                           <Button type="submit">Filter</Button>
                       </div>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default Filter;
