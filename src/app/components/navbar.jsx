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
		<aside className="sticky top-16 left-0 mx-1 h-5/6 w-fit  p-4  shadow-lg rounded-md  bg-primaryColor z-50 hidden md:block">
			<div className="mb-2 p-4">
				<Typography variant="h5" color="white">
					Fri7a admin panel
				</Typography>
			</div>

			<List><Link href="/dashboard">
				<ListItem className="hover:bg-scandaryColor">
					<ListItemPrefix>
						<PresentationChartBarIcon className="h-5 w-5" />
					</ListItemPrefix>
					
						<Typography color="white">dashboard</Typography>
					
				</ListItem></Link>
<Link href="#">
				<ListItem className="hover:bg-scandaryColor">
					<ListItemPrefix>
						<ShoppingBagIcon className="h-5 w-5" />
					</ListItemPrefix>
					
						<Typography color="white">e-commerce</Typography>
					
				</ListItem></Link>
				<Link href="/orders">
					<ListItem className="hover:bg-scandaryColor">
						<ListItemPrefix>
							<InboxIcon className="h-5 w-5" />
						</ListItemPrefix>

						<Typography color="white">orders</Typography>

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
				</Link><Link href="/products">
				<ListItem className="hover:bg-scandaryColor">
					<ListItemPrefix>
						<PlusCircleIcon className="h-5 w-5" />
					</ListItemPrefix>
					
						<Typography color="white">add products</Typography>
					
				</ListItem></Link>
<Link href="/reels">
				<ListItem className="hover:bg-scandaryColor">
					<ListItemPrefix>
						<CameraIcon className="h-5 w-5" />
					</ListItemPrefix>
					
						<Typography color="white">upload reels</Typography>
					
				</ListItem></Link>

				<ListItem className="hover:bg-scandaryColor">
					<ListItemPrefix>
						<Cog6ToothIcon className="h-5 w-5" />
					</ListItemPrefix>
					<Typography color="white">settings</Typography>
				</ListItem>
<Link href="/">
				<ListItem className="hover:bg-scandaryColor">
					<ListItemPrefix>
						<PowerIcon className="h-5 w-5" />
					</ListItemPrefix>
					
						<Typography color="white">logout</Typography>
				
				</ListItem>	</Link>
			</List>
		</aside>
	);
}
