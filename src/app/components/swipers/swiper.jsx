"use client";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useEffect, useState } from "react";
import Short from "./short";
import { selep } from "./sleep";
import SwiperLoading from "./swiperLoading";
import { HeartIcon } from "@heroicons/react/24/solid";
import { ChatBubbleBottomCenterIcon, EyeIcon } from "@heroicons/react/24/outline";
export default function Swipers() {
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		selep().then(setIsLoading(false));
	}, []);
	return !isLoading ? (
		<Swiper
			modules={[A11y, Navigation, Pagination]}
			spaceBetween={50}
			slidesPerView={1.5}
			scrollbar={{ draggable: true }}
			freeMode={true}
			navigation={{
				nextEl: ".nextEl",
				prevEl: ".prevEl",
			}}
			watchOverflow={true}
			breakpoints={{
				640: {
					slidesPerView: 2.5,
					spaceBetween: 20,
				},
				960: {
					slidesPerView: 3.5,
					spaceBetween: 40,
				},
				1160: {
					slidesPerView: 4.5,
					spaceBetween: 60,
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
