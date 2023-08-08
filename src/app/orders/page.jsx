"use client";
import React, { useEffect,useState } from "react";
import SpeedyDial from "../components/speedDial";
import CiCard from "../components/cards";
import {
  CameraIcon,
  ChatBubbleBottomCenterIcon,
  CurrencyDollarIcon,
  EyeIcon,
  HeartIcon,
  ReceiptRefundIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import CiTable2 from "../components/table2";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, fetchOrdersStatistique } from "../redux/orderReducer";
const TABS = [
  {
    label: "الكل",
    value: "all",
  },
  { label: "انتظار", value: "pending" },
  {
    label: "مقبول",
    value: "accepted",
  },
  {
    label: "مرفوض",
    value: "rejected",
  },
  {
    label: "مُلْغي",
    value: "cancelled",
  },
  {
    label: "تم",
    value: "completed",
  },
  {
    label: "روتور",
    value: "return",
  },
];

const TABLE_HEAD = ["المستخدمين", "روتور", "الكمية", "الطلبية", "سجل"];

const TABLE_ROWS = [
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "John Michael",
    email: "0540430098",
    items: "77",
    paid: "5822$",
    order: "xyz",
    date: "23/04/18",
    returns: "5",
  },
];
const max = 10;
export default function page() {
  const order2 = useSelector((store) => store.orders).orders.orders;
  const {
    statistique: {
      orders,
      lastOrders,
      likes,
      lastLikes,
      sales,
      lastSales,
      returns,
      lastReturns,
    },
  } = useSelector((store) => store.orders);
  const [min, setMin] = useState(0);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrdersStatistique())
      .unwrap()
      .catch((err) => console.error(err));
  }, []);
  useEffect(() => {
	console.log(min,name,type);
    dispatch(fetchOrders({ min, name, type }))
      .unwrap()
      .catch((err) => console.error(err));
  }, [min, name, type]);
  return (
    <div className="shadow-lg rounded-xl h-fit md:h-full w-full grid row-span-3 mx-5  bg-white">
      <SpeedyDial />
      <div className="h-1/3 m-5 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4 xl:gap-x-8">
        <CiCard
          icon={<ShoppingBagIcon className="w-8 h-8 text-white" />}
          color={"bg-primaryColor"}
          title={"الطلبات"}
          value={orders}
          footer={"الشهر السابق"}
          footervalue={lastOrders}
          footercolor={"text-green-400"}
        />
        <CiCard
          icon={<HeartIcon className="w-8 h-8 text-white" />}
          color={"bg-azure"}
          title={"اعحاب"}
          value={likes}
          footer={"الشهر السابق"}
          footervalue={lastLikes}
          footercolor={"text-green-400"}
        />
        <CiCard
          icon={<CurrencyDollarIcon className="w-8 h-8 text-white" />}
          color={"bg-pink-500"}
          title={"مبيعات "}
          value={sales}
          footer={"الشهر السابق"}
          footervalue={lastSales}
          footercolor={"text-green-400"}
        />
        <CiCard
          icon={<ReceiptRefundIcon className="w-8 h-8 text-white" />}
          color={"bg-trueblue"}
          title={"الرتور"}
          value={returns}
          footer={"الشهر السابق"}
          footervalue={lastReturns}
          footercolor={"text-green-400"}
        />
      </div>
      <div className="w-full overflow-auto h-fit">
        <CiTable2
          TABS={TABS}
          TABLE_HEAD={TABLE_HEAD}
          TABLE_ROWS={order2}
          count={orders}
          max={max}
          page={Math.ceil(min / max + 1)}
          onChangePage={(value) => setMin(value)}
		  onChangeName={(value) => setName(value)}
		  onChangeTab={(value) => setType(value)}
        />
      </div>
    </div>
  );
}
