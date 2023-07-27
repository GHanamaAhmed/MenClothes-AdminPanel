'use client'
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";

export default function Gallary  ({images}) {
	return (
		<div className="flex flex-row items-center justify-between gap-2 rounded-lg w-full">
			{images.map((image, index) => (
				<div key={index}>
					<label
						htmlFor="file-input"
						className="cursor-pointer rounded-lg  p-2"
					>
						<img
							src={image}
							alt="gallary"
							className="w-[300px] h-[300px] object-cover rounded-lg shadow-lg hover:w-[325px] hover:h-[325px] hover:shadow-xl transition-all shadow-gray-600"
						/>
						<input type="file" name="file-input" id="file-input" className="hidden" />
					</label>
				</div>
			))}
		</div>
	);}	
