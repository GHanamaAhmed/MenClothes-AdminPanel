import React from 'react'
import SpeedyDial from '../components/speedDial';
import CiCard from '../components/cards';
import { ArrowLeftIcon, ArrowRightIcon, ChatBubbleBottomCenterIcon, CurrencyDollarIcon, EyeIcon, HeartIcon, ShoppingBagIcon, UserIcon } from '@heroicons/react/24/solid';
import { CameraIcon } from '@heroicons/react/24/outline';
import Swipers from '../components/swipers/swiper';
import Reels from '../components/reels';

export default function page() {
  return (
		<div className="shadow-lg  rounded-xl h-fit md:h-full w-full md:w-full  grid row-span-3 md:m-5 md:p-5 gap-5 bg-white">
			<SpeedyDial />
			<div className="h-1/3 m-5 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4 xl:gap-x-8">
				<CiCard
					icon={<CameraIcon className="w-8 h-8 text-white" />}
					color={"bg-primaryColor"}
					title={"videos"}
					value={"53"}
					footer={"	last month"}
					footervalue={"+20%"}
					footercolor={"text-green-400"}
				/>
				<CiCard
					icon={<HeartIcon className="w-8 h-8 text-white" />}
					color={"bg-azure"}
					title={"likes"}
					value={"219"}
					footer={"	last month"}
					footervalue={"-1%"}
					footercolor={"text-red-400"}
				/>
				<CiCard
					icon={<ChatBubbleBottomCenterIcon className="w-8 h-8 text-white" />}
					color={"bg-pink-500"}
					title={"comments"}
					value={"1500$"}
					footer={"	last month"}
					footervalue={"+5%"}
					footercolor={"text-green-400"}
				/>
				<CiCard
					icon={<EyeIcon className="w-8 h-8 text-white" />}
					color={"bg-trueblue"}
					title={"views"}
					value={"2833"}
					footer={"	last month"}
					footervalue={"+10%"}
					footercolor={"text-green-400"}
				/>
			</div>
			<section className="w-full overflow-hidden  h-fit flex flex-row justify-center items-center">
				<div className="hidden gap-7 md:flex">
					<button className="prevEl">
						<ArrowRightIcon />
					</button>
					<button className="nextEl">
						<ArrowLeftIcon />
					</button>
				</div>
				<div className="w-11/12">
					<Swipers />
				</div>
			</section>
			<div className="flex  justify-center items-center h-fit w-full">
				<Reels></Reels>
			</div>
		</div>
	);
}
