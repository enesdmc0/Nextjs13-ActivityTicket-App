"use client"
import React from 'react';
import {EffectFade, Autoplay} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import { Activity } from '@prisma/client';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import Image from "next/image"

interface Props  {
    activity: Activity
}

const SwiperDetail: React.FC<Props> = ({activity}) => {

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
                
                {activity.imagesURL.map((image, index) => (
                    <SwiperSlide className='relative' key={index}>
                    <Image fill src={image} className="object-cover" alt=""/>
                    </SwiperSlide>
                ))}
            
            </Swiper>

        </div>
    );
};

export default SwiperDetail;
