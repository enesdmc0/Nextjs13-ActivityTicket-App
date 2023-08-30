"use client"
import React from 'react';
import {EffectFade, Autoplay} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import { Activity } from '@prisma/client';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import SwiperCard from "@/components/SwiperCard";

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
                        <SwiperCard activity={activity}/>
                    </SwiperSlide>
                ))}
            
            </Swiper>

        </div>
    );
};

export default SwiperHome;
