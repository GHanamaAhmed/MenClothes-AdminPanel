"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/navbar";
import SpeedyDial from "../components/speedDial";
import { fetchStatistique } from "../redux/statistiqueReducer";
export default function RootLayout({ children }) {
  const dispatch = useDispatch();
  const {
    users: { users },
  } = useSelector((store) => store.controlPanel);
  const {
    orders: { orders },
  } = useSelector((store) => store.orders);
  const {
    products: { products },
  } = useSelector((store) => store.products);
  const {
    reels: { reels },
  } = useSelector((store) => store.reels);
  const {
    coupon: { coupon },
  } = useSelector((store) => store.coupons);
  useEffect(() => {
    dispatch(fetchStatistique())
      .unwrap()
      .catch((err) => console.error(err));
  }, [reels, products, orders, users, coupon]);
  return (
    <div className="flex flex-row h-fit w-full md:w-full justify-start gap-2 z-0 bg-blue-gray-50 scroll-my-0">
      <Navbar />
      <div className="shadow-lg rounded-xl h-fit md:h-full w-full grid row-span-3 mx-5  bg-white">
        <SpeedyDial />
        {children}
      </div>
    </div>
  );
}
