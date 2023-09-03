"use client"
import React from 'react';
import {Autoplay, Pagination} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Activity, Image as Images} from '@prisma/client';
import 'swiper/css';
import 'swiper/css/pagination';
import {cn} from "@/lib/utils";
import {CardDescription, CardFooter, CardHeader, CardTitle, Card} from "@/components/ui/card";
import Image from "next/image";
import {Badge} from "@/components/ui/badge";
import {BadgeCheck, Calendar, MapPin, Pi, UserCircle2, Wallet} from "lucide-react";

interface Props {
    populerActivities: (Activity & {images: Images[]})[]
    className?: React.ComponentProps<typeof Card>
}

const data = [
    "https://images.unsplash.com/photo-1570498839593-e565b39455fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGZvb3RiYWxsfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXJ0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2luZW1hfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bXVzaWN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1557777586-f6682739fcf3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZhc2hpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
]

const SwiperPopulerActivities: React.FC<Props> = ({populerActivities, className, ...props}) => {
    return (
        <Swiper
            breakpoints={{
                576: {
                    slidesPerView: 2,
                },
                920: {
                    slidesPerView: 3,
                },
            }}
            slidesPerView={1}
            spaceBetween={30}
            modules={[Autoplay, Pagination]}
            className="h-[300px] rounded-md "
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
            }}
        >

            {populerActivities.length === 0
                ? (data.map(item => (
                    <SwiperSlide className='relative' key={item}>
                        <Image
                            fill
                            src={item}
                            alt="Image" className="rounded-md object-cover overflow-hidden "/>
                    </SwiperSlide>
                )))
                : (populerActivities.map((activity) => (
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

                            <Image
                                fill
                                src={activity.images[0].url}
                                alt="Image" className="rounded-md object-cover overflow-hidden "/>
                        </Card>

                    </SwiperSlide>
                )))

            }

        </Swiper>
    );
};

export default SwiperPopulerActivities;
