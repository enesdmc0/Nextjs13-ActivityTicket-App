"use client"
import React from 'react';
import {EffectFade, Autoplay, Pagination} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Activity} from '@prisma/client';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import {cn} from "@/lib/utils";
import {CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Card} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import {Badge, badgeVariants} from "@/components/ui/badge";


interface Props {
    populerActivities: Activity[]
    className?: React.ComponentProps<typeof Card>
}

const SwiperPopulerActivities: React.FC<Props> = ({populerActivities, className, ...props}) => {

    return (
        <div>
            <Swiper
                spaceBetween={10}
                modules={[Autoplay, EffectFade, Pagination]}
                effect={'fade'}
                className="h-[400px] rounded-md shadow-lg"
                pagination={{
                    type: 'progressbar',
                }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
            >

                {populerActivities.map(activity => (
                    <SwiperSlide className='relative' key={activity.id}>
                        <Card className={cn("relative cursor-pointer h-full", className)} {...props}>
                            <div className="relative z-50 text-white h-full flex flex-col justify-between">
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <span className="ml-auto space-x-1">
                                            {activity.isFree && <Badge variant="destructive">Free</Badge>}
                                            {activity.isPopuler && <Badge variant="secondary">Populer</Badge>}
                                        </span>
                                    </CardTitle>
                                    <CardDescription className="text-white text-xl font-semibold ">
                                        <span className="bg-black rounded-md p-2">{activity.title}</span>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="text-md  text-white font-bold">
                                    <span className="bg-black rounded-md p-2">{activity.description}</span>
                                </CardContent>
                                <CardFooter>
                                    <div className="ml-auto space-x-3 space-y-2">
                                        <Badge>{activity.city}</Badge>
                                        <Link href="/122333"
                                              className={badgeVariants({variant: "default"})}>{activity.category}</Link>
                                        {activity.price && <Badge>{activity.price} TL</Badge>}
                                        <Badge
                                            variant="secondary">{activity.startDate.toISOString().split("T")[0]} - {activity.endDate.toISOString().split("T")[0]}</Badge>
                                    </div>
                                </CardFooter>
                            </div>

                            <Image fill
                                   src={activity.imagesURL[0]}
                                   alt="Image" className="rounded-md object-cover opacity-80"/>

                        </Card>

                    </SwiperSlide>
                ))}

            </Swiper>
        </div>
    );
};

export default SwiperPopulerActivities;
