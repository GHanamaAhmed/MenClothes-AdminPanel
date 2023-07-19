import Image from "next/image";
import CiCard from "../components/cards";
import {
	PresentationChartBarIcon,
	ShoppingBagIcon,
	Cog6ToothIcon,
	InboxIcon,
	PowerIcon,
	PlusCircleIcon,
	CameraIcon,
  UserIcon,
  CurrencyPoundIcon,
  CurrencyDollarIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import SpeedyDial from "../components/speedDial";
import CiTable from "../components/table";
const TABS = [
	{
		label: "All",
		value: "all",
	},
	{
		label: "google",
		value: "google",
	},
	{
		label: "meta",
		value: "meta",
	},
];

const TABLE_HEAD = ["المستخدمين", "الكمية", "حساب", "سجل"];

const TABLE_ROWS = [
	{
		img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
		name: "John Michael",
		email: "john@creative-tim.com",
		items: "77",
		paid: "5822$",
		subsicribed: true,
		date: "23/04/18",
	},
	{
		img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
		name: "Alexa Liras",
		email: "alexa@creative-tim.com",
		items: "65",
		paid: "4930$",
		subsicribed: false,
		date: "23/04/18",
	},
	{
		img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
		name: "Laurent Perrier",
		email: "laurent@creative-tim.com",
		items: "59",
		paid: "4450$",
		subsicribed: false,
		date: "19/09/17",
	},
	{
		img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
		name: "Michael Levi",
		email: "michael@creative-tim.com",
		items: "55",
		paid: "4200$",
		subsicribed: true,
		date: "24/12/08",
	},
	{
		img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
		name: "Richard Gran",
		email: "richard@creative-tim.com",
		items: "52",
		paid: "3910$",
		subsicribed: false,
		date: "04/10/21",
	},
];

export default function Home() {
	return (
		<div className="shadow-lg p-1 m-1 rounded-xl h-fit md:h-full w-fit md:w-full  grid row-span-3 md:m-5 md:p-5  bg-white">
			<SpeedyDial />
			<div className="h-1/3 m-5 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4 xl:gap-x-8">
				<CiCard
					icon={<UserIcon className="w-8 h-8 text-white" />}
					color={"bg-scandaryColor"}
					title={"المستخدمين"}
					value={"187"}
					footer={"الشهر الماضي"}
					footervalue={"%20+"}
					footercolor={"text-green-400"}
				/>
				<CiCard
					icon={<ShoppingBagIcon className="w-8 h-8 text-white" />}
					color={"bg-azure"}
					title={"تم بيعه"}
					value={"219"}
					footer={"الشهر الماضي"}
					footervalue={"%1-"}
					footercolor={"text-red-400"}
				/>
				<CiCard
					icon={<CurrencyDollarIcon className="w-8 h-8 text-white" />}
					color={"bg-pink-500"}
					title={"الارباح"}
					value={"1500$"}
					footer={"الشهر الماضي"}
					footervalue={"%5+"}
					footercolor={"text-green-400"}
				/>
				<CiCard
					icon={<EyeIcon className="w-8 h-8 text-white" />}
					color={"bg-red-400"}
					title={"المشاهدات"}
					value={"2833"}
					footer={"الشهر الماضي"}
					footervalue={"%10+"}
					footercolor={"text-green-400"}
				/>
			</div>

			<div className="w-">
				<CiTable TABS={TABS} TABLE_HEAD={TABLE_HEAD} TABLE_ROWS={TABLE_ROWS} />
			</div>
		</div>
	);
}
