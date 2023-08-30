"use client"
import React from 'react';
import { cn } from "@/lib/utils";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Card } from "@/components/ui/card";
import Image from "next/image";
import { Activity } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import {useRouter} from "next/navigation";

interface Props {
    className?: React.ComponentProps<typeof Card>
    activity: Activity
    isOutdated?: boolean;
}


const CardComponent: React.FC<Props> = ({ className, activity, isOutdated, ...props }) => {
    const router = useRouter()

    return (
        <Card onClick={() => router.push(`/${activity.id}`)} className={cn("col-span-1 relative cursor-pointer", className)} {...props}>
            <div className="relative z-40 text-white">
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <span className="ml-auto space-x-1">
                            {activity.isFree && <Badge variant="destructive">Free</Badge>}
                            {activity.isPopuler && <Badge>Populer</Badge>}
                        </span>
                    </CardTitle>
                    <CardDescription className="text-white text-xl font-semibold">
                        {activity.title}
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-sm font-bold">
                    {activity.description}
                </CardContent>
                <CardFooter>
                    <div className="ml-auto space-x-3 space-y-2">
                        <Badge>{activity.city}</Badge>
                        <Badge>{activity.category}</Badge>
                        {activity.price && <Badge>{activity.price} TL</Badge>}
                        <Badge variant="secondary">{activity.startDate.toISOString().split("T")[0]} - {activity.endDate.toISOString().split("T")[0]}</Badge>
                    </div>
                </CardFooter>
            </div>

            <Image fill
                src="https://plus.unsplash.com/premium_photo-1669997804173-1cf7003d0664?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60"
                alt="Image" className="rounded-md object-cover opacity-90" />
            {isOutdated && <div className="absolute top-0 left-0 p-3 bg-black rounded-md h-full w-full z-50 opacity-30 hover:opacity-80 text-red-600 font-bold">OUTDATED</div>}
                
        </Card>
    );
};

export default CardComponent;
