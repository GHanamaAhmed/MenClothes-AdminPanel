import React from "react";
import SpeedyDial from "../components/speedDial";
import CiCard from "../components/cards";
import {
	CameraIcon,
	ChatBubbleBottomCenterIcon,
	CurrencyDollarIcon,
	EyeIcon,
	HeartIcon,
	ReceiptRefundIcon,
	ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import CiTable2 from "../components/table2";
const TABS = [
	{
		label: "الكل",
		value: "الكل",
	},
	{
		label: "مقبول",
		value: "مقبول",
	},
	{
		label: "مرفوض",
		value: "مرفوض",
	},
	{
		label: "مُلْغي",
		value: "مُلْغي",
	},
	{
		label: "تم",
		value: "تم",
	},
];

const TABLE_HEAD = ["المستخدمين", "الكمية", "الطلبية", "سجل"];

const TABLE_ROWS = [
	{
		img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
		name: "John Michael",
		email: "0540430098",
		items: "77",
		paid: "5822$",
		order: "xyz",
		date: "23/04/18",
	},
	{
		img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
		name: "Alexa Liras",
		email: "0540430098",
		items: "65",
		paid: "4930$",
		order: "xyz ",
		date: "23/04/18",
	},
	{
		img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
		name: "Laurent Perrier",
		email: "0540430098",
		items: "59",
		paid: "4450$",
		order: "xyz ",
		date: "19/09/17",
	},
	{
		img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
		name: "Michael Levi",
		email: "0540430098",
		items: "55",
		paid: "4200$",
		order: true,
		date: "24/12/08",
	},
	{
		img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
		name: "Richard Gran",
		email: "0540430098",
		items: "52",
		paid: "3910$",
		order: "xyz ",
		date: "04/10/21",
	},
];
export default function page() {
	return (
		<div className="shadow-lg rounded-xl h-fit md:h-full w-full grid row-span-3 mx-5  bg-white">
			<SpeedyDial />
			<div className="h-1/3 m-5 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4 xl:gap-x-8">
				<CiCard
					icon={<ShoppingBagIcon className="w-8 h-8 text-white" />}
					color={"bg-primaryColor"}
					title={"الطلبات"}
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
			<div className="w-full overflow-scroll h-fit">
				<CiTable2 TABS={TABS} TABLE_HEAD={TABLE_HEAD} TABLE_ROWS={TABLE_ROWS} />
			</div>
		</div>
	);
}
