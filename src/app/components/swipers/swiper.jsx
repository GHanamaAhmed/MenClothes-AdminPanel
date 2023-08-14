"use client";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";
import { useEffect, useState, useRef } from "react";
import Short from "./short";
import { selep } from "./sleep";
import SwiperLoading from "./swiperLoading";
import { useSelector } from "react-redux";

export default function Swipers({ reels, onEnd }) {
  const [customReels, setCustomReels] = useState([]);
  const [first, setFirst] = useState(true);
  const swiperRef = useRef(null);
  useEffect(() => {
    setCustomReels(reels);
    first && swiperRef.current?.isEnd && onEnd();
    setFirst(false);
  }, [reels]);
  return (
    <Swiper
      modules={[A11y, Navigation, Pagination]}
      spaceBetween={40}
      slidesPerView={1.5}
      scrollbar={{ draggable: true }}
      freeMode={true}
      navigation={{
        nextEl: ".nextEl",
        prevEl: ".prevEl",
      }}
      onSlideChange={(swiper) => {
        swiper.isEnd && onEnd();
      }}
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
      onScroll={(swiper) => {
        swiper.isEnd && onEnd();
      }}
      watchOverflow={false}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        960: {
          slidesPerView: 3,
          spaceBetween: 35,
        },
        1160: {
          slidesPerView: 4,
          spaceBetween: 55,
        },
      }}
    >
      {reels.map((e, i) => (
        <SwiperSlide key={i}>
          {" "}
          <Short reel={e} edit={true} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
