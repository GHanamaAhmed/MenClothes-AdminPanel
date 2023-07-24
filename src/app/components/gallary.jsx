

'use client'
import React, {  useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";


// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";
import Image from "next/image";

export default function Gallary() {
	const [thumbsSwiper, setThumbsSwiper] = useState(null);

	return (
		<>
			<Swiper
				spaceBetween={10}
                slidesPerView={1}
				navigation={true}
				thumbs={{ swiper: thumbsSwiper }}
				modules={[FreeMode, Navigation, Thumbs]}
				className="mySwiper2"
			>
				<SwiperSlide>
					<Image
						className=""
						width='400' height='200'
						src="https://swiperjs.com/demos/images/nature-1.jpg"
                        alt="img"
					/>
				</SwiperSlide>
				<SwiperSlide>
					<Image
						className=""
						width='400' height='200'
						src="https://swiperjs.com/demos/images/nature-2.jpg"
                        alt="img"
					/>
				</SwiperSlide>
				<SwiperSlide>
					<Image
						className=""
						width='400' height='200'
						src="https://swiperjs.com/demos/images/nature-3.jpg"
                        alt="img"
					/>
				</SwiperSlide>
				<SwiperSlide>
					<Image
						className=""
						width='400' height='200'
						src="https://swiperjs.com/demos/images/nature-4.jpg"
                        alt="img"
					/>
				</SwiperSlide>
			</Swiper>
			<Swiper
				onSwiper={setThumbsSwiper}
				loop={true}
				spaceBetween={10}
				slidesPerView={4}
				freeMode={true}
				watchSlidesProgress={true}
				modules={[FreeMode, Navigation, Thumbs]}
				className="mySwiper"
			>
				<SwiperSlide>
					<Image
						className=""
						width='40' height='20'
						src="https://swiperjs.com/demos/images/nature-1.jpg"
                        alt="img"
					/>
				</SwiperSlide>
				<SwiperSlide>
					<Image
						className=""
						width='40' height='20'
						src="https://swiperjs.com/demos/images/nature-2.jpg"
                        alt="img"   
					/>
				</SwiperSlide>
				<SwiperSlide>
					<Image
						className=""
						width='40' height='20'
						src="https://swiperjs.com/demos/images/nature-3.jpg"
                        alt="img"
					/>
				</SwiperSlide>
				<SwiperSlide>
					<Image
						className=""
						width='40' height='20'
						src="https://swiperjs.com/demos/images/nature-4.jpg"
                        alt="img"
					/>
				</SwiperSlide>
				<SwiperSlide>
					<Image
						className=""
						src="https://swiperjs.com/demos/images/nature-4.jpg"
                        width='40' height='20'
                        alt="img"
					/>
				</SwiperSlide>
			</Swiper>
		</>
	);
}
