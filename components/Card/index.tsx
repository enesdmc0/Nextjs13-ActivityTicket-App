import React from 'react';
import {cn} from "@/lib/utils";
import {CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Card} from "@/components/ui/card";
import {Activity} from "@prisma/client";
import {Badge} from "@/components/ui/badge";
import {BadgeCheck, Calendar, ChevronRight, Landmark, MapPin, Pi, Wallet} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

interface Props {
    className?: React.ComponentProps<typeof Card>
    activity: Activity
    isOutdated?: boolean;
}


const CardComponent: React.FC<Props> = ({className, activity, isOutdated, ...props}) => {

    return (
        <Card
            className={cn("col-span-1 relative cursor-pointer bg-secondary rounded-md aspect-square overflow-hidden", className)} {...props}>
            <div className="relative z-40 h-full flex flex-col justify-between">
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <span className="ml-auto space-x-1">
                            {activity.isFree &&
                                <Badge>
                                    <BadgeCheck className="w-4 h-4 mr-1"/>
                                    Free
                                </Badge>
                            }
                            {activity.isPopuler &&
                                <Badge>
                                    <BadgeCheck className="w-4 h-4 mr-1"/>
                                    Populer
                                </Badge>
                            }
                        </span>
                    </CardTitle>
                    <CardDescription className="text-xl font-semibold">
                        {activity.title}
                    </CardDescription>

                </CardHeader>

                <CardFooter>
                    <div className="ml-auto space-x-3 space-y-2 relative">
                        <Badge>
                            <MapPin className="w-4 h-4 mr-1"/>
                            <span className="capitalize">{activity.city}</span>
                        </Badge>
                        <Badge>
                            <Pi className="w-4 h-4 mr-1"/>
                            <span className="capitalize">{activity.category}</span>
                        </Badge>
                        <Badge>
                            <Landmark className="w-4 h-4 mr-1"/>
                            <span className="capitalize">{activity.organizers}</span>
                        </Badge>

                        {activity.price.length !== 1 &&
                            <Badge>
                                <Wallet className="w-4 h-4 mr-1"/>
                                <span>{activity.price[0]} TL</span>
                            </Badge>
                        }

                        <Badge variant="secondary">
                            <Calendar className="w-4 h-4 mr-1"/>
                            <span className="capitalize">{activity.activityDate.toISOString().split("T")[0]}</span>
                        </Badge>

                        <Button variant="outline" asChild className="absolute right-0 bottom-0">
                            <Link href={`/${activity.id}`}>
                                <ChevronRight className="h-4 w-4"/>
                            </Link>
                        </Button>

                    </div>

                </CardFooter>
            </div>

            <Image src={activity.imagesURL[0]} alt="" fill />
            {isOutdated && <div
                className="absolute top-0 left-0 p-3 bg-black rounded-md h-full w-full z-50 opacity-30 hover:opacity-80 text-red-600 font-bold">OUTDATED</div>}

        </Card>
    );
};

export default CardComponent;
