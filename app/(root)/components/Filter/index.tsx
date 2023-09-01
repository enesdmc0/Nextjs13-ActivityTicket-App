"use client"
import React from 'react';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {Activity} from "@prisma/client";
import {useAtom} from "jotai";
import {dateAtom} from "@/atom";
import {DatePickerWithRange} from "@/components/ui/date-range-picker";
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

interface Props {
    activities: Activity[]
    allActivities: Activity[]
}

const formSchema = z.object({
    category: z.string(),
    city: z.string(),
    place: z.string(),
})
type FilterValues = z.infer<typeof formSchema>

const Filter: React.FC<Props> = ({activities, allActivities}) => {
    const [date, setDate] = useAtom(dateAtom)
    const router = useRouter()
    const form = useForm<FilterValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            category: undefined,
            city: undefined,
            place: undefined
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
        const startDate = date?.from?.toDateString()
        const endDate = date?.to?.toDateString()
        router.push(`/?category=${data.category}&city=${data.city}&place=${data.place}&start=${startDate}&end=${endDate}`, {scroll: false})
    }

    const today = new Date()
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1)
    const dateRange = {
        from: today,
        to: tomorrow,
    };

    const handleReset = () => {
        router.push("/", {scroll: false})
        setDate(dateRange)
        router.refresh()
    }

    return (
        <div className="flex gap-5">
            <DatePickerWithRange/>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">

                    <div className="grid grid-cols-4 gap-4">
                        <FormField
                            control={form.control}
                            name="category"
                            render={({field}) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Category"/>
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
                       <div className="space-x-2">
                           <Button onClick={handleReset} variant="secondary" type="button">Reset</Button>
                           <Button type="submit">Filter</Button>
                       </div>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default Filter;
