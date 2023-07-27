import React from "react";
import SpeedyDial from "../components/speedDial";
import {
	CubeIcon,
	CurrencyDollarIcon,
	HeartIcon,
} from "@heroicons/react/24/outline";
import CiCard from "../components/cards";
import Promo from "../components/promo";
import { BiSolidCoupon } from "react-icons/bi";
import { FcExpired } from "react-icons/fc";
import CiPromoTable from "../components/tablepromo";
const TABS = [
	{
		label: "All",
		value: "all",
	},
	{
		label: "استعمل",
		value: " استعمل",
	},
	{
		label: "لم يستعمل",
		value: "لم يستعمل",
	},
];

const TABLE_HEAD = [
	"الكود",
	"الاستعمال",
	"تاريخ الاضافة",
	"تاريخ الاستعمال",
	" ",
];

const TABLE_ROWS = [
	{
		Promocode: "vine33",
		percentage: "21%",
		Used: true,
		createDate: "7/7/2023",
		useDate:"6/5/2023",
	},
	{
		Promocode: "summer77",
		percentage: "22%",
		Used: true,
		createDate: "6/5/2023",
		useDate:"6/5/2023",
	},
	{
		Promocode: "School01",
		percentage: "23%",
		Used: true,
		createDate: "5/9/2023",
		useDate:"6/5/2023",
	},
	{
		Promocode: "wow12",
		percentage: "24%",
		Used: true,
		createDate: "5/5/2023",
		useDate:"6/5/2023",
	},
	{
		Promocode: "real20",
		percentage: "25%",
		Used: true,
		createDate: "5/2/2023",
		useDate:"6/5/2023",
	},
];
export default function page() {
	return (
		<div className="shadow-lg rounded-xl h-fit md:h-full w-full grid row-span-3 mx-5  bg-white">
			<SpeedyDial />
			<div className="h-1/3 m-5 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4 xl:gap-x-8">
				<CiCard
					icon={<BiSolidCoupon className="h-8 w-8 text-white" />}
					color={"bg-primaryColor"}
					title={"promo codes"}
					value={"12"}
					footer={"الشهر السابق"}
					footervalue={"%20+"}
					footercolor={"text-green-400"}
				/>
				<CiCard
					icon={<HeartIcon className="w-8 h-8 text-white" />}
					color={"bg-azure"}
					title={"المتبقي"}
					value={"5"}
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
					icon={<FcExpired className="w-8 h-8 text-white" />}
					color={"bg-trueblue"}
					title={"المستخذم"}
					value={"7"}
					footer={"الشهر السابق"}
					footervalue={"%5+"}
					footercolor={"text-green-400"}
				/>
			</div>
			<div className=" flex flex-row items-center justify-center">
				<Promo />
			</div>
			<div>
				<CiPromoTable
					TABLE_HEAD={TABLE_HEAD}
					TABLE_ROWS={TABLE_ROWS}
					TABS={TABS}
					Header={"جدول الاكواد"}
					subheader={"جدول لعرض الاكواد التخفيض"}
				/>
			</div>
		</div>
	);
}
