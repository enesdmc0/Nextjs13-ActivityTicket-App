"use client"
import React from 'react';
import {Autoplay, Pagination} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import { Activity, Image as Images } from '@prisma/client';
import 'swiper/css';
import 'swiper/css/pagination';

import Image from "next/image"

interface Props  {
    activity: Activity & {images: Images[]}
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
                
                {activity.images.map((image, index) => (
                    <SwiperSlide className='relative' key={index}>
                    <Image fill src={image.url} className="object-cover aspect-square rounded-md" alt=""/>
                    </SwiperSlide>
                ))}

                {/*<SwiperSlide className='relative'>*/}
                {/*    <Image fill src={activity.imageUrl} className="object-cover aspect-square rounded-md" alt=""/>*/}
                {/*</SwiperSlide>*/}

            </Swiper>

        </div>
    );
};

export default SwiperActivityDetail;
