import React from 'react';
import {cn} from "@/lib/utils";
import {CardDescription, CardFooter, CardHeader, CardTitle, Card} from "@/components/ui/card";
import {Activity, Image as Images} from "@prisma/client";
import {Badge} from "@/components/ui/badge";
import {BadgeCheck, Calendar, ChevronRight, Coins, MapPin, Pi, UserCircle2, Wallet} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

interface Props {
    className?: React.ComponentProps<typeof Card>
    activity: Activity & {images: Images[]}
    isOutdated?: boolean;
}


const CardComponent: React.FC<Props> = ({className, activity, isOutdated, ...props}) => {
    const firstImage = activity.images[0].url
    return (
        <Card
            className={cn("col-span-6 md:col-span-3 xl:col-span-2 relative cursor-pointer bg-secondary rounded-md aspect-square overflow-hidden", className)} {...props}>
            <div className="relative z-40 h-full flex flex-col justify-between">
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <span className="ml-auto space-x-1">
                            {activity.isFree &&
                                <Badge>
                                    <Coins className="w-4 h-4 mr-1"/>
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
                    <CardDescription>
                       <span className="bg-secondary text-md text-secondary-foreground font-semibold rounded-md p-1">{activity.title}</span>
                    </CardDescription>

                </CardHeader>

                <CardFooter>
                    <div className="ml-auto  items-end  grid grid-cols-5">
                        <div className="col-span-4 space-y-2 space-x-3">
                            <Badge>
                                <MapPin className="w-4 h-4 mr-1"/>
                                <span className="capitalize">{activity.city}</span>
                            </Badge>
                            <Badge>
                                <Pi className="w-4 h-4 mr-1"/>
                                <span className="capitalize">{activity.category}</span>
                            </Badge>
                            <Badge>
                                <UserCircle2 className="w-4 h-4 mr-1"/>
                                <span className="capitalize">{activity.organizers}</span>
                            </Badge>

                            {activity.price !== 0 &&
                                <Badge>
                                    <Wallet className="w-4 h-4 mr-1"/>
                                    <span>{activity.price} TL</span>
                                </Badge>
                            }

                            <Badge variant="secondary">
                                <Calendar className="w-4 h-4 mr-1"/>
                                <span className="capitalize">{activity.activityDate.toDateString()}</span>
                            </Badge>
                        </div>

                        <Button variant="secondary" asChild className="col-span-1 ">
                            <Link href={`/${activity.id}`}>
                                <ChevronRight className="h-4 w-4"/>
                            </Link>
                        </Button>
                    </div>

                </CardFooter>
            </div>

            <Image src={firstImage} alt="" fill />
            {isOutdated && <div
                className="absolute top-0 left-0 p-3 bg-black rounded-md h-full w-full z-50 opacity-30 hover:opacity-80 text-red-600 font-bold">OUTDATED</div>}

        </Card>
    );
};

export default CardComponent;
