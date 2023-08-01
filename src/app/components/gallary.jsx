'use client'
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";

export default function Gallary  ({images}) {
	return (
		<div className="flex items-center justify-start gap-2 flex-nowrap overflow-x-auto overflow-y-hidden w-full">
			{images?.map((image, index) => (
				<div key={index}>
					<label
						htmlFor="file-input"
						className="cursor-pointer rounded-lg  p-2"
					>
						<img
							src={image}
							alt="gallary"
							className="w-[200px] h-[200px] min-w-[200px] object-cover rounded-lg shadow-lg hover:w-[225px] hover:h-[225px] hover:shadow-xl transition-all shadow-gray-600"
						/>
						<input type="file" name="file-input" id="file-input" className="hidden" />
					</label>
				</div>
			))}
		</div>
	);}	
