"use client";
import {
	Card,
	Typography,
	List,
	ListItem,
	ListItemPrefix,
	ListItemSuffix,
	Chip,
	SpeedDial,
	SpeedDialHandler,
	SpeedDialContent,
	SpeedDialAction,
	IconButton,
} from "./import";
import {
	PresentationChartBarIcon,
	ShoppingBagIcon,
	UserCircleIcon,
	Cog6ToothIcon,
	InboxIcon,
	PowerIcon,
	PlusCircleIcon,
	CameraIcon,
	PlusIcon,
	HomeIcon,
	CogIcon,
	Square3Stack3DIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";

export default function SpeedyDial() {
	return (
		<div className="fixed bottom-10 right-4 m-4  w-fit h-fit  z-50 md:hidden">
			<SpeedDial placement="top">
				<SpeedDialHandler>
					<IconButton size="lg" className="rounded-full bg-scandaryColor">
						<PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
					</IconButton>
				</SpeedDialHandler>
				<SpeedDialContent>
					<SpeedDialAction className="bg-primaryColor">
						<Link href="/dashboard">
							<PresentationChartBarIcon className="h-5 w-5 text-white"></PresentationChartBarIcon>
						</Link>
					</SpeedDialAction>
					<SpeedDialAction className="bg-primaryColor">
						<Link href="#">
							<ShoppingBagIcon className="h-5 w-5 text-white"></ShoppingBagIcon>
						</Link>
					</SpeedDialAction>
					<SpeedDialAction className="bg-primaryColor">
						<Link href="/products">
							<PlusCircleIcon className="h-5 w-5 text-white"></PlusCircleIcon>
						</Link>
					</SpeedDialAction>
					<SpeedDialAction className="bg-primaryColor">
						<Link href="/orders">
							<InboxIcon className="h-5 w-5 text-white"></InboxIcon>
						</Link>
					</SpeedDialAction>
					<SpeedDialAction className="bg-primaryColor">
						<Link href="/reels">
							<CameraIcon className="h-5 w-5 text-white"></CameraIcon>
						</Link>
					</SpeedDialAction>
					<SpeedDialAction className="bg-primaryColor">
						<Link href="/settings">
							<Cog6ToothIcon className="h-5 w-5 text-white"></Cog6ToothIcon>
						</Link>
					</SpeedDialAction>
					<SpeedDialAction className="bg-primaryColor">
						<Link href="/">
							<PowerIcon className="h-5 w-5 text-white"></PowerIcon>
						</Link>
					</SpeedDialAction>
				</SpeedDialContent>
			</SpeedDial>
		</div>
	);
}
