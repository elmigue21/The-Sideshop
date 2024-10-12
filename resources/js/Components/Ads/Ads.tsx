import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Logo from '../assets/Logo300.png'
// import "swiper/swiper-bundle.min.css";
import { Autoplay } from "swiper/modules";


import adOne from './ad1.png'
import adTwo from './ad2.png'
import adThree from './ad3.png'

import "swiper/css";
import "swiper/css/pagination";

// import "./styles.css";

interface AdsProps{
  className?:string
}

const Ads:React.FC<AdsProps> = ({className}) => {
    return (
        <div className={`${className} overflow-hidden`}>
            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                modules={[Autoplay]} // Use Autoplay as a module
                autoplay={{ delay: 3000 }} // Auto-slide every 3 seconds
                loop={true}
                className="w-full object-cover h-full block bg-red-500"
            >
                <SwiperSlide className="object-cover w-full bg-blue-500">
                    <img
                        src={adOne}
                        alt="Slide 1"
                        className="object-cover w-full"
                    />
                </SwiperSlide>
                <SwiperSlide className="object-cover w-full">
                    <img
                        src={adTwo}
                        alt="Slide 2"
                        className="object-cover w-full"
                    />
                </SwiperSlide>
                <SwiperSlide className="object-cover w-full">
                    <img
                        src={adThree}
                        alt="Slide 3"
                        className="object-cover w-full"
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Ads;
