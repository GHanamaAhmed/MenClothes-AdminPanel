'use client'
import {
	ChatBubbleBottomCenterIcon,
	EyeIcon,
	HeartIcon,
} from "@heroicons/react/24/outline";
import reel from "./img/reels.png";
import Image from "next/image";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton } from "./../import";
import { useState } from "react";
import Reels from "../reels";
import Reels2 from "../reels2";
import Link from "next/link";
export default function Short({ likes, comments, views, title, subtitle }) {
		const [open, setOpen] = useState(false);

		const handleOpen = () => setOpen(!open);
	if (likes == null) {
		likes = "0";
	}
	if (comments == null) {
		comments = "0";
	}
	if (views == null) {
		views = "0";
	}
	if (title == null) {
		title = "قبقب";
	}
	if (subtitle == null) {
		subtitle = "قيقي";
	}
	return (
		<div className="my-3 text-right left-2">
			<div className="absolute bottom-3 right-1 z-10 flex flex-col text-right">
				<p className="text-lg text-white">{title}</p>
				<p className="text-sm text-white">{subtitle}</p>
			</div>
			<div className="relative m-0  max-w-none rounded-lg h-72 max-h-none w-52 md:h-80 md:w-60 flex items-center justify-start text-right">
				<Image priority fill className=" " src={reel} alt="reel" />
				<div className="absolute bottom-1 left-1  lg:left-2 z-10 flex flex-col text-right">
					<p className="text-sm text-red-500 flex flex-row-reverse items-center justify-end ">
						{likes} <HeartIcon width={25} height={25} className="text-sm" />
					</p>
					<p className="text-sm text-scandaryColor flex flex-row-reverse items-center justify-end ">
						{comments}{" "}
						<Link href='#'>
							{" "}
							<ChatBubbleBottomCenterIcon width={25} height={25} className="" />
						</Link>
					</p>
					<p className="text-sm text-trueblue flex flex-row-reverse items-center justify-end">
						{views} <EyeIcon className="" width={25} height={25} />
					</p>
				</div>
			</div>

			<div className="absolute top-[5%] right-[10%]  lg:right-1 z-10 flex flex-col gap-0 text-right">
				<IconButton className="bg-transparent shadow-none hover:shadow-red-500 ">
					<p className="text-sm text-red-500 flex flex-row-reverse items-center justify-end ">
						<TrashIcon width={20} height={20} className="text-sm" />
					</p>
				</IconButton>

				<IconButton
					className="bg-transparent shadow-none hover:shadow-lightSolid"
					onClick={handleOpen}
				>
					<p className="text-sm text-lightSolid flex flex-row-reverse items-center justify-end ">
						<PencilIcon width={20} height={20} className="" />
					</p>
				</IconButton>
				<Dialog open={open} handler={handleOpen}>
					<DialogBody
						divider
						className="h-[40rem]  overflow-scroll flex flex-row justify-center items-center"
					>
						<Reels2
							tit={title}
							comm={comments}
							like={likes}
							views={views}
							subtit={subtitle}
						></Reels2>
					</DialogBody>
					<DialogFooter className="space-x-2">
						<Button
							variant="text"
							color="red"
							onClick={handleOpen}
							className="mr-1"
						>
							<span>اغلاق</span>
						</Button>
						<Button variant="gradient" color="green" onClick={handleOpen}>
							<span>تحديث</span>
						</Button>
					</DialogFooter>
				</Dialog>
			</div>
		</div>
	);
}
