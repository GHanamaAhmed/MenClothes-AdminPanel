"use client";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SpeedyDial from "../components/speedDial";
import { fetchStatistique } from "../redux/statistiqueReducer";
import { Axios } from "../../../lib/axios";
import { useRouter } from "next/navigation";
import Navbar2 from "../components/navbar";
export default function RootLayout({ children }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useLayoutEffect(() => {
    Axios.head("/auth/admin")
      .then((res) => setIsLoading(false))
      .catch((err) => {
        console.error(err);
        router.replace("/");
      });
  }, []);
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
    !isLoading && (
      <div className="flex flex-col items-center">
        <Navbar2 />
        <div className="w-11/12 pt-28 pb-10">{children}</div>
      </div>
    )
  );
}
