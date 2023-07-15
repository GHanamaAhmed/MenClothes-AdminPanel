import {
	ChatBubbleBottomCenterIcon,
	EyeIcon,
	HeartIcon,
} from "@heroicons/react/24/outline";
import reel from "./img/reels.png";
import Image from "next/image";
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
		title = "Title";
	}
	if (subtitle == null) {
		subtitle = "Subtitle";
	}
	return (
		<div className="my-3">
			<div className="absolute bottom-6 left-6 z-10 flex flex-col">
				<p className="text-lg text-white">{title}</p>
				<p className="text-sm text-white">{subtitle}</p>
			</div>
			<div className="relative flex items-center justify-start">
				<Image
					priority
					className="m-0 h-72 max-h-none w-52 max-w-none rounded-lg md:h-80 md:w-60"
					src={reel}
					alt="reel"
				/>
			</div>
			<div className="absolute bottom-[5%] right-[2%] md:-right-[20%] z-10 flex flex-col ">
				<p className="text-sm text-red-500 flex flex-row-reverse items-center justify-start ">
					{likes} <HeartIcon width={25} height={25} className="text-sm" />
				</p>
				<p className="text-sm text-scandaryColor flex flex-row-reverse items-center justify-start ">
					{comments}{" "}
					<ChatBubbleBottomCenterIcon width={25} height={25} className="" />
				</p>
				<p className="text-sm text-trueblue flex flex-row-reverse items-center justify-start">
					{views} <EyeIcon className="" width={25} height={25} />
				</p>
			</div>
		</div>
	);
}
