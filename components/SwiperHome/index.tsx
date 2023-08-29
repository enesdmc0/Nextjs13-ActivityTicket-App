"use client"
import React from 'react';
import {EffectFade, Autoplay} from 'swiper/modules';
import {Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import { Activity } from '@prisma/client';
import Image from "next/image"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

interface Props  {
    populerActivities: Activity[]
}

const SwiperHome: React.FC<Props> = ({populerActivities}) => {
    return (
        <div>
            <Swiper
                spaceBetween={10}
                modules={[Autoplay, EffectFade]}
                effect={'fade'}
                className="h-[400px] rounded-md shadow-lg"
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
            >
                
                {populerActivities.map(activity => (
                    <SwiperSlide className='relative' key={activity.id}>
                    <Image fill src={activity.imagesURL[0]} className="object-cover" alt=""/>
                    </SwiperSlide>
                ))}
            
            </Swiper>

        </div>
    );
};

export default SwiperHome;
