import React from 'react'

import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import img_1 from '../assets/car-1.jpg'
import img_2 from '../assets/car-2.jpg'
import img_3 from '../assets/car-3.jpg'
// import img_2 from '../assets/car-2.jpeg'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface CarouselProps {
    slidesPerView: number,
    autoPlay: boolean
}


const Carousel: React.FC<CarouselProps> = ({ slidesPerView, autoPlay }) => {
    return (
        <div className='h-[500px]'>
            <Swiper
                // install Swiper modules
                modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
                className='h-full w-full'
                slidesPerView={slidesPerView}
                autoplay={autoPlay}
                spaceBetween={0}
            >
                <SwiperSlide className='w-full bg-black text-white'><img src={img_1} alt="" className='w-full h-full object-center object-cover' /></SwiperSlide>
                <SwiperSlide className='w-full bg-black text-white'><img src={img_2} alt="" className='w-full h-full object-center object-cover' /></SwiperSlide>
                <SwiperSlide className='w-full bg-black text-white'><img src={img_3} alt="" className='w-full h-full object-center object-cover' /></SwiperSlide>
            </Swiper>
        </div>
    )
}

export default Carousel