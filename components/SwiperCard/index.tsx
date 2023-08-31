import React from 'react';
import { cn } from "@/lib/utils";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Card } from "@/components/ui/card";
import Image from "next/image";
import { Activity } from "@prisma/client";
import { Badge } from "@/components/ui/badge";

interface Props {
    className?: React.ComponentProps<typeof Card>
    activity: Activity
}
const SwiperCard: React.FC<Props> = ({ className, activity, ...props }) => {
    return (
        <Card className={cn("relative cursor-pointer h-full", className)} {...props}>
            <div className="relative z-50 text-white h-full flex flex-col justify-between">
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <span className="ml-auto space-x-1">
                            {activity.isFree && <Badge variant="destructive">Free</Badge>}
                            {activity.isPopuler && <Badge>Populer</Badge>}
                        </span>
                    </CardTitle>
                    <CardDescription className="text-white text-xl font-semibold ">
                        <span className="bg-gray-900 rounded-md p-2">{activity.title}</span>
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-md font-bold">
                    <span className="bg-gray-900 rounded-md p-2">{activity.description}</span>
                </CardContent>
                <CardFooter>
                    <div className="ml-auto space-x-3 space-y-2">
                        <Badge>{activity.city}</Badge>
                        <Badge>{activity.category}</Badge>
                        {activity.price && <Badge>{activity.price} TL</Badge>}
                        <Badge variant="secondary">{activity.activityDate.toISOString().split("T")[0]}</Badge>
                    </div>
                </CardFooter>
            </div>

            <Image fill
                   src={activity.imagesURL[0]}
                   alt="Image" className="rounded-md object-cover" />

        </Card>
    );
};

export default SwiperCard;
