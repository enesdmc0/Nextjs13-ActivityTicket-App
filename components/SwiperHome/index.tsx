"use client"
import React from 'react';
import {EffectFade, Autoplay} from 'swiper/modules';
import {Swiper, SwiperSlide, useSwiper} from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const SwiperHome = () => {
    return (
        <div>
            <Swiper
                spaceBetween={10}
                modules={[Autoplay, EffectFade]}
                effect={'fade'}
                className="h-[400px]"
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
            >
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-1.jpg"/>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-2.jpg"/>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-3.jpg"/>
                </SwiperSlide>
            </Swiper>

        </div>
    );
};

export default SwiperHome;
