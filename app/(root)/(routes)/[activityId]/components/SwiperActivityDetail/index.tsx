"use client"
import React from 'react';
import {EffectFade, Autoplay, Pagination} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import { Activity } from '@prisma/client';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

import Image from "next/image"

interface Props  {
    activity: Activity
}

const SwiperActivityDetail: React.FC<Props> = ({activity}) => {

    return (
        <div>
            <Swiper
                spaceBetween={10}
                modules={[Autoplay, EffectFade, Pagination]}
                effect={'fade'}
                pagination={{
                    type: 'progressbar',
                }}
                className="h-[400px] rounded-md shadow-lg"
                autoplay={{
                    delay: 4000,
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

export default SwiperActivityDetail;
