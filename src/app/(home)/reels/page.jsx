"use client";
import React, { useEffect, useState } from "react";
import SpeedyDial from "../../components/speedDial";
import CiCard from "../../components/cards";
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
import Swipers from "../../components/swipers/swiper";
import Reels from "../../components/reels";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReels,
  fetchReelsMore,
  fetchReelsStatistique,
} from "../../redux/reelsReducer";
import { fetchStatistique } from "../../redux/controlPanelReducer";

export default function Page() {
  const dispatch = useDispatch();
  const {
    statistique: {
      reels,
      lastReels,
      viewsReels,
      lastViewsReels,
      likesReel,
      lastLikesReel,
      comment,
      lastComment,
    },
  } = useSelector((store) => store.statistique);
  const reels2 = useSelector((store) => store.reels).reels.reels;
  const fetchReel = () => {
    dispatch(fetchReelsMore({ min: reels2?.length }))
      .unwrap()
      .catch((err) => console.error(err));
  };
  const refrechReel = () => {
    dispatch(fetchReels({ min: 0, max: reels2?.length }))
      .unwrap()
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    dispatch(fetchReels({ min: reels2?.length }))
      .unwrap()
      .catch((err) => console.error(err));
  }, []);
  useEffect(() => {
    setInterval(() => {
      refrechReel();
    }, 1000 * 120);
  }, []);
  return (
    <div className="w-full">
      <div className="m-5 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4 xl:gap-x-8">
        <CiCard
          icon={<CameraIcon className="w-8 h-8 text-white" />}
          color={"bg-primaryColor"}
          title={"videos"}
          value={reels}
          footer={"اخر شهر"}
          footervalue={lastReels}
          footercolor={"text-green-400"}
        />
        <CiCard
          icon={<HeartIcon className="w-8 h-8 text-white" />}
          color={"bg-azure"}
          title={"likesReel"}
          value={likesReel}
          footer={"اخر شهر"}
          footervalue={lastLikesReel}
          footercolor={"text-red-400"}
        />
        <CiCard
          icon={<ChatBubbleBottomCenterIcon className="w-8 h-8 text-white" />}
          color={"bg-pink-500"}
          title={"comments"}
          value={comment}
         footer={"اخر شهر"}
          footervalue={lastComment}
          footercolor={"text-green-400"}
        />
        <CiCard
          icon={<EyeIcon className="w-8 h-8 text-white" />}
          color={"bg-trueblue"}
          title={"views"}
          value={viewsReels}
         footer={"اخر شهر"}
          footervalue={lastViewsReels}
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
          <Swipers reels={reels2} onEnd={() => fetchReel()} />
        </div>
      </section>
      <div className="flex justify-center items-center h-fit w-full">
        <Reels />
      </div>
    </div>
  );
}
