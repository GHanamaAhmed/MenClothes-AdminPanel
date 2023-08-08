"use client";
import React, { useEffect } from "react";
import SpeedyDial from "../components/speedDial";
import CiCard from "../components/cards";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChatBubbleBottomCenterIcon,
  CurrencyDollarIcon,
  EyeIcon,
  HeartIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { CameraIcon } from "@heroicons/react/24/outline";
import Swipers from "../components/swipers/swiper";
import Reels from "../components/reels";
import { useDispatch, useSelector } from "react-redux";
import { fetchReels, fetchReelsStatistique } from "../redux/reelsReducer";

export default function page() {
  const dispatch = useDispatch();
  const {
    statistique: {
      reels,
      lastReels,
      views,
      lastViews,
      likes,
      lastLikes,
      comment,
      lastComment,
    },
  } = useSelector((store) => store.reels);
  const reels2 = useSelector((store) => store.reels).reels.reels;
  useEffect(() => {
    dispatch(fetchReelsStatistique())
      .unwrap()
      .catch((err) => console.error(err));
    dispatch(fetchReels())
      .unwrap()
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="shadow-lg  rounded-xl h-fit md:h-full w-full md:w-full  grid row-span-3 md:m-5 md:p-5 gap-5 bg-white">
      <SpeedyDial />
      <div className="h-1/3 m-5 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4 xl:gap-x-8">
        <CiCard
          icon={<CameraIcon className="w-8 h-8 text-white" />}
          color={"bg-primaryColor"}
          title={"videos"}
          value={reels}
          footer={"	last month"}
          footervalue={lastReels}
          footercolor={"text-green-400"}
        />
        <CiCard
          icon={<HeartIcon className="w-8 h-8 text-white" />}
          color={"bg-azure"}
          title={"likes"}
          value={likes}
          footer={"	last month"}
          footervalue={lastLikes}
          footercolor={"text-red-400"}
        />
        <CiCard
          icon={<ChatBubbleBottomCenterIcon className="w-8 h-8 text-white" />}
          color={"bg-pink-500"}
          title={"comments"}
          value={comment}
          footer={"	last month"}
          footervalue={lastComment}
          footercolor={"text-green-400"}
        />
        <CiCard
          icon={<EyeIcon className="w-8 h-8 text-white" />}
          color={"bg-trueblue"}
          title={"views"}
          value={views}
          footer={"	last month"}
          footervalue={lastViews}
          footercolor={"text-green-400"}
        />
      </div>
      <section className="w-full overflow-hidden  h-fit flex flex-row justify-center items-center">
        <div className="hidden gap-7 md:flex">
          <button className="prevEl">
            <ArrowRightIcon />
          </button>
          <button className="nextEl">
            <ArrowLeftIcon />
          </button>
        </div>
        <div className="w-full">
          <Swipers reels={reels2} />
        </div>
      </section>
      <div className="flex  justify-center items-center h-fit w-full">
        <Reels />
      </div>
    </div>
  );
}
