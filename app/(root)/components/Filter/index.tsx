"use client"
import React from 'react';
import {DatePickerWithRange} from "@/components/ui/date-range-picker";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {Activity} from "@prisma/client";

interface Props {
    activities: Activity[]
}

const Filter: React.FC<Props> = ({activities}) => {

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

    return (
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
    );
};

export default Filter;
