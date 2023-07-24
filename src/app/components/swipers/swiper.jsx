"use client";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";
import { useEffect, useState } from "react";
import Short from "./short";
import { selep } from "./sleep";
import SwiperLoading from "./swiperLoading";

export default function Swipers() {
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		selep().then(setIsLoading(false));
	}, []);
	return !isLoading ? (
		<Swiper
			modules={[A11y, Navigation, Pagination]}
			spaceBetween={40}
			slidesPerView={1.5}
			scrollbar={{ draggable: true }}
			freeMode={true}
			navigation={{
				nextEl: ".nextEl",
				prevEl: ".prevEl",
			}}
			watchOverflow={false}
			breakpoints={{
				640: {
					slidesPerView: 2,
					spaceBetween: 15,
				},
				960: {
					slidesPerView: 3,
					spaceBetween: 35,
				},
				1160: {
					slidesPerView: 4,
					spaceBetween: 55,
				},
				
			}}
		>
			{[...Array(10)].map((e, i) => (
				<SwiperSlide key={i}>
					{" "}
					<Short />

				</SwiperSlide>
			))}
		</Swiper>
	) : (
		<SwiperLoading />
	);
}
