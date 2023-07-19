import {
	ChatBubbleBottomCenterIcon,
	EyeIcon,
	HeartIcon,
} from "@heroicons/react/24/outline";
import reel from "./img/reels.png";
import Image from "next/image";
import { TrashIcon } from "@heroicons/react/24/solid";
export default function Short({ likes, comments, views, title, subtitle }) {
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
			<div className="relative flex items-center justify-start text-right">
				<Image
					priority
					className="m-0 h-72 max-h-none w-52 max-w-none rounded-lg md:h-80 md:w-60"
					src={reel}
					alt="reel"
				/>
			</div>
			<div className="absolute bottom-[5%] left-[10%]  lg:-left-[15%] z-10 flex flex-col text-right">
				<p className="text-sm text-red-500 flex flex-row-reverse items-center justify-end ">
					{likes} <HeartIcon width={25} height={25} className="text-sm" />
				</p>
				<p className="text-sm text-scandaryColor flex flex-row-reverse items-center justify-end ">
					{comments}{" "}
					<ChatBubbleBottomCenterIcon width={25} height={25} className="" />
				</p>
				<p className="text-sm text-trueblue flex flex-row-reverse items-center justify-end">
					{views} <EyeIcon className="" width={25} height={25} />
				</p>
			</div>
		</div>
	);
}
