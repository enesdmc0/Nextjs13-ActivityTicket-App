"use client"
import React from 'react';
import {Autoplay, Pagination} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Activity} from '@prisma/client';
import 'swiper/css';
import 'swiper/css/pagination';
import {cn} from "@/lib/utils";
import {CardDescription, CardFooter, CardHeader, CardTitle, Card} from "@/components/ui/card";
import Image from "next/image";
import {Badge} from "@/components/ui/badge";
import {BadgeCheck, Calendar, MapPin, Pi, UserCircle2, Wallet} from "lucide-react";

interface Props {
    populerActivities: Activity[]
    className?: React.ComponentProps<typeof Card>
}

const SwiperPopulerActivities: React.FC<Props> = ({populerActivities, className, ...props}) => {

    return (
        <Swiper
            slidesPerView={3}
            spaceBetween={30}
            modules={[Autoplay, Pagination]}
            className="h-[300px] rounded-md "
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
            }}
        >

            {populerActivities.map(activity => (
                <SwiperSlide className='relative ' key={activity.id}>
                    <Card className={cn("relative aspect-square cursor-pointer h-full", className)} {...props}>
                        <div className="relative z-50 text-white h-full flex flex-col justify-between">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                        <span className="ml-auto space-x-1">
                                            {activity.isFree &&
                                                <Badge>
                                                    <BadgeCheck className="w-4 h-4 mr-1"/>
                                                    Free
                                                </Badge>}
                                            {activity.isPopuler &&
                                                <Badge variant="secondary">
                                                    <BadgeCheck className="w-4 h-4 mr-1"/>
                                                    Populer
                                                </Badge>}
                                        </span>
                                </CardTitle>
                                <CardDescription className="text-xl font-semibold ">
                                    <Badge variant="secondary">{activity.title}</Badge>
                                </CardDescription>
                            </CardHeader>
                            <CardFooter>
                                <div className="ml-auto space-x-3 space-y-2">
                                    <Badge>
                                        <MapPin className="w-4 h-4 mr-1"/>
                                        <span className="capitalize">{activity.city}</span>
                                    </Badge>
                                    <Badge>
                                        <UserCircle2 className="w-4 h-4 mr-1"/>
                                        <span className="capitalize">{activity.organizers}</span>
                                    </Badge>
                                    <Badge>
                                        <Pi className="w-4 h-4 mr-1"/>
                                        <span className="capitalize">{activity.category}</span>
                                    </Badge>
                                    {activity.price !== 0 && <Badge>
                                        <Wallet className="w-4 h-4 mr-1"/>
                                        <span>{activity.price} TL</span>
                                    </Badge>}
                                    <Badge variant="secondary">
                                        <Calendar className="w-4 h-4 mr-1"/>
                                        <span
                                            className="capitalize">{activity.activityDate.toDateString()}</span>
                                    </Badge>
                                </div>
                            </CardFooter>
                        </div>

                        {/*{*/}
                        {/*    activity.imagesURL.map((image, index) => (*/}
                        {/*        <Image*/}
                        {/*            key={index}*/}
                        {/*            fill*/}
                        {/*            src={image}*/}
                        {/*            alt="Image" className="rounded-md object-cover overflow-hidden "/>*/}
                        {/*    ))*/}
                        {/*}*/}

                        <Image
                        fill
                        src={activity.imageUrl}
                        alt="Image" className="rounded-md object-cover overflow-hidden "/>

                    </Card>

                </SwiperSlide>
            ))}

        </Swiper>
    );
};

export default SwiperPopulerActivities;
