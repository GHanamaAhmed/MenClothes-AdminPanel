import {
	ChatBubbleBottomCenterIcon,
	EyeIcon,
	HeartIcon,
} from "@heroicons/react/24/outline";
import reel from "./swipers/img/reels.png";
import Image from "next/image";
export default function Shorty({ likes, comments, views, title, subtitle }) {
	if (likes == null) {
		likes = "0";
	}
	if (comments == null) {
		comments = "0";
	}
	if (views == null) {
		views = "0";
	}if (title == null) {	
		title = "عنوان";
	}
	if (subtitle == null) {	
		subtitle = "عنوان";
	}
	return (
		<div className="w-10/12">
			<div className="relative bottom-0  flex items-center justify-center ">
				<div className="absolute bottom-4 right-1 md:bottom-6 md:right-6 z-10 flex flex-col text-right">
					<p className="text-lg text-white">{title}</p>
					<p className="text-sm text-white">{subtitle}</p>
				</div>
				<Image
					priority
					className="m-4 h-72 max-h-none w-46 max-w-100 rounded-lg md:h-90 md:w-52"
					src={reel}
					alt="reel"
				/>
				<div className="absolute bottom-[5%] left-[5%] md:left-[10%] md:bottom-5 z-10 flex flex-col ">
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
		</div>
	);
}
