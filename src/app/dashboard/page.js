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

export default function Home() {
	return (
		<div className="shadow-lg p-1 m-1 rounded-xl h-fit md:h-full w-fit md:w-full  grid row-span-3 md:m-5 md:p-5  bg-white">
			<SpeedyDial />
			<div className="h-1/3 m-5 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4 xl:gap-x-8">
				<CiCard
					icon={<UserIcon className="w-8 h-8 text-white" />}
					color={"bg-scandaryColor"}
					title={"users"}
					value={"187"}
					footer={"	last month"}
					footervalue={"+20%"}
					footercolor={"text-green-400"}
				/>
				<CiCard
					icon={<ShoppingBagIcon className="w-8 h-8 text-white" />}
					color={"bg-azure"}
					title={"sold"}
					value={"219"}
					footer={"	last month"}
					footervalue={"-1%"}
					footercolor={"text-red-400"}
				/>
				<CiCard
					icon={<CurrencyDollarIcon className="w-8 h-8 text-white" />}
					color={"bg-pink-500"}
					title={"revenue"}
					value={"1500$"}
					footer={"	last month"}
					footervalue={"+5%"}
					footercolor={"text-green-400"}
				/>
				<CiCard
					icon={<EyeIcon className="w-8 h-8 text-white" />}
					color={"bg-red-400"}
					title={"views"}
					value={"2833"}
					footer={"	last month"}
					footervalue={"+10%"}
					footercolor={"text-green-400"}
				/>
			</div>


			<div className="w-">
				<CiTable />
			</div>
		</div>
	);
}
