import React from 'react'
import SpeedyDial from '../components/speedDial';
import { CubeIcon, CurrencyDollarIcon, HeartIcon } from '@heroicons/react/24/outline';
import CiCard from '../components/cards';
import { ReceiptRefundIcon } from '@heroicons/react/24/solid';

export default function page() {
  return (
		<div className="shadow-lg rounded-xl h-fit md:h-full w-full grid row-span-3 mx-5  bg-white">
			<SpeedyDial />
			<div className="h-1/3 m-5 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4 xl:gap-x-8">
				<CiCard
					icon={<CubeIcon className="w-8 h-8 text-white" />}
					color={"bg-primaryColor"}
					title={"منتجات"}
					value={"53"}
					footer={"الشهر السابق"}
					footervalue={"%20+"}
					footercolor={"text-green-400"}
				/>
				<CiCard
					icon={<HeartIcon className="w-8 h-8 text-white" />}
					color={"bg-azure"}
					title={"اعحاب"}
					value={"219"}
					footer={"الشهر السابق"}
					footervalue={"%1-"}
					footercolor={"text-red-400"}
				/>
				<CiCard
					icon={<CurrencyDollarIcon className="w-8 h-8 text-white" />}
					color={"bg-pink-500"}
					title={"مبيعات "}
					value={"34"}
					footer={"الشهر السابق"}
					footervalue={"%5+"}
					footercolor={"text-green-400"}
				/>
				<CiCard
					icon={<ReceiptRefundIcon className="w-8 h-8 text-white" />}
					color={"bg-trueblue"}
					title={"الرتور"}
					value={"10"}
					footer={"الشهر السابق"}
					footervalue={"%5+"}
					footercolor={"text-green-400"}
				/>
			</div>
		</div>
	);
}
