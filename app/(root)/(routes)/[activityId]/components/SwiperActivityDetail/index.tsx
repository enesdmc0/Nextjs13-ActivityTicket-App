"use client"
import React from 'react';
import {Autoplay, Pagination} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import { Activity } from '@prisma/client';
import 'swiper/css';
import 'swiper/css/pagination';

import Image from "next/image"

interface Props  {
    activity: Activity
}

const SwiperActivityDetail: React.FC<Props> = ({activity}) => {

    return (
        <div>
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
                
                {/*{activity.imagesURL.map((image, index) => (*/}
                {/*    <SwiperSlide className='relative' key={index}>*/}
                {/*    <Image fill src={image} className="object-cover aspect-square rounded-md" alt=""/>*/}
                {/*    </SwiperSlide>*/}
                {/*))}*/}

                <SwiperSlide className='relative'>
                    <Image fill src={activity.imageUrl} className="object-cover aspect-square rounded-md" alt=""/>
                </SwiperSlide>

            </Swiper>

        </div>
    );
};

export default SwiperActivityDetail;
