import React from "react";
import SpeedyDial from "../components/speedDial";
import {
	CubeIcon,
	CurrencyDollarIcon,
	HeartIcon,
} from "@heroicons/react/24/outline";
import CiCard from "../components/cards";
import { ReceiptRefundIcon } from "@heroicons/react/24/solid";
import CiTable from "../components/table";
import ProductTable from "../components/ProductTable";
const TABS = [
	{
		label: "All",
		value: "all",
	},
	{
		label: "حذاء",
		value: "1 حذاء",
	},
	{
		label: "حذاء",
		value: "2 حذاء",
	},
	{
		label: "حذاء",
		value: "3 حذاء",
	},
];

const TABLE_HEAD = ["المنتج", "الكمية", "ريل", "تاريخ الاضافة"];

const TABLE_ROWS = [
	{
		img: "https://images.pexels.com/photos/2783873/pexels-photo-2783873.jpeg?auto=compress&cs=tinysrgb&w=600",
		name: "adidas1",
		price: "77$",
		stock: "77",
		type: "حذاء",
		reel: "#",
		reelid: "ttt",
		date: "23/04/18",
	},
	{
		img: "https://images.pexels.com/photos/2783873/pexels-photo-2783873.jpeg?auto=compress&cs=tinysrgb&w=600",
		name: "adidas2",
		price: "77$",
		stock: "65",
		type: "حذاء",
		reel: "#",
		reelid: "ttt",
		date: "23/04/18",
	},
	{
		img: "https://images.pexels.com/photos/2783873/pexels-photo-2783873.jpeg?auto=compress&cs=tinysrgb&w=600",
		name: "adidas3",
		price: "77$",
		stock: "59",
		type: "حذاء",
		reel: "#",
		reelid: "ttt",
		date: "19/09/17",
	},
	{
		img: "https://images.pexels.com/photos/2783873/pexels-photo-2783873.jpeg?auto=compress&cs=tinysrgb&w=600",
		name: "adidas4",
		price: "77$",
		stock: "55",
		type: "حذاء",
		reel: "#",
		reelid: "ttt",
		date: "24/12/08",
	},
	{
		img: "https://images.pexels.com/photos/2783873/pexels-photo-2783873.jpeg?auto=compress&cs=tinysrgb&w=600",
		name: "adidas5",
		price: "77$",
		stock: "52",
		type: "حذاء",
		reel: "#",
		reelid: "ttt",
		date: "04/10/21",
	},
];
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
			<div>
				<ProductTable
					TABLE_HEAD={TABLE_HEAD}
					TABLE_ROWS={TABLE_ROWS}
					TABS={TABS}
					Header={"products"}
					subheader={"see products"}
				/>
			</div>
		</div>
	);
}
