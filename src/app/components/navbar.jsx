"use client";
import {
	Typography,
	List,
	ListItem,
	ListItemPrefix,
	ListItemSuffix,
	Chip,
} from "./import";
import {
	PresentationChartBarIcon,
	ShoppingBagIcon,
	Cog6ToothIcon,
	InboxIcon,
	PowerIcon,
	PlusCircleIcon,
	CameraIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Navbar() {
	return (
		<aside className="sticky top-16 left-0 mx-1 h-5/6 w-fit  p-4  shadow-lg rounded-xl  bg-primaryColor z-50 hidden md:block">
			<div className="mb-2 p-4">
				<Typography variant="h5" color="white" className="font-Hacen-Tunisia">
					مركز القيادة
				</Typography>
			</div>

			<List>
				<Link href="/dashboard">
					<ListItem className="hover:bg-scandaryColor gap-1 ">
						<ListItemPrefix>
							<PresentationChartBarIcon className="h-5 w-5" />
						</ListItemPrefix>

						<Typography color="white" className="font-Hacen-Tunisia">
							لوحة التحكم
						</Typography>
					</ListItem>
				</Link>
				<Link href="#">
					<ListItem className="hover:bg-scandaryColor gap-1">
						<ListItemPrefix>
							<ShoppingBagIcon className="h-5 w-5" />
						</ListItemPrefix>

						<Typography color="white" className="font-Hacen-Tunisia">
							الموقع
						</Typography>
					</ListItem>
				</Link>
				<Link href="/orders">
					<ListItem className="hover:bg-scandaryColor gap-1">
						<ListItemPrefix>
							<InboxIcon className="h-5 w-5" />
						</ListItemPrefix>

						<Typography color="white" className="font-Hacen-Tunisia">
							الطلبيات
						</Typography>

						<ListItemSuffix>
							<Chip
								value="14"
								size="sm"
								variant="ghost"
								color="cyan"
								className="rounded-full"
							/>
						</ListItemSuffix>
					</ListItem>
				</Link>
				<Link href="/products">
					<ListItem className="hover:bg-scandaryColor gap-1">
						<ListItemPrefix>
							<PlusCircleIcon className="h-5 w-5" />
						</ListItemPrefix>

						<Typography color="white" className="font-Hacen-Tunisia">
							{" "}
							المنتجات
						</Typography>
					</ListItem>
				</Link>
				<Link href="/reels">
					<ListItem className="hover:bg-scandaryColor gap-1 ">
						<ListItemPrefix>
							<CameraIcon className="h-5 w-5" />
						</ListItemPrefix>

						<Typography color="white" className="font-Hacen-Tunisia">
							{" "}
							ريلز
						</Typography>
					</ListItem>
				</Link>
				<Link href="/">
					<ListItem className="hover:bg-scandaryColor gap-1">
						<ListItemPrefix>
							<PowerIcon className="h-5 w-5" />
						</ListItemPrefix>

						<Typography color="white" className="font-Hacen-Tunisia">
							تسجيل الخروج
						</Typography>
					</ListItem>{" "}
				</Link>
			</List>
		</aside>
	);
}
