"use client";
import React, { useEffect, useState } from "react";
import SpeedyDial from "../../components/speedDial";
import CiCard from "../../components/cards";
import {
  CameraIcon,
  ChatBubbleBottomCenterIcon,
  CurrencyDollarIcon,
  EyeIcon,
  HeartIcon,
  ReceiptRefundIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import CiTable2 from "../../components/table2";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, fetchOrdersStatistique } from "../../redux/orderReducer";
import { fetchStatistique } from "../../redux/controlPanelReducer";
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
    label: "تم",
    value: "completed",
  },
  {
    label: "روتور",
    value: "return",
  },
];

const TABLE_HEAD = ["المستخدمين", "روتور", "الكمية", "الطلبية", "سجل", ""];

const max = 6;
export default function Page() {
  const order2 = useSelector((store) => store.orders).orders.orders;
  const count = useSelector((store) => store.orders).orders.count;
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
  } = useSelector((store) => store.statistique);
  const [min, setMin] = useState(0);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [forceRendre, setForceRendre] = useState(0);
  const [reverse, setReverse] = useState(0);
  useEffect(() => {
    setInterval(() => {
      setForceRendre((prev) => prev + 1);
    }, 1000 * 20);
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrders({ min, name, type, reverse }))
      .unwrap()
      .catch((err) => console.error(err));
  }, [min, name, type, forceRendre, reverse]);
  useEffect(() => {
    setMin(0);
  }, [name, type]);
  return (
    <>
      <div className="h-1/3 m-5 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4 xl:gap-x-8">
        <CiCard
          icon={<ShoppingBagIcon className="w-8 h-8 text-white" />}
          color={"bg-primaryColor"}
          title={"الطلبات"}
          value={orders}
          footer={"اخر شهر"}
          footervalue={lastOrders}
          footercolor={"text-green-400"}
        />
        <CiCard
          icon={<HeartIcon className="w-8 h-8 text-white" />}
          color={"bg-azure"}
          title={"اعحاب"}
          value={likes}
          footer={"اخر شهر"}
          footervalue={lastLikes}
          footercolor={"text-green-400"}
        />
        <CiCard
          icon={<CurrencyDollarIcon className="w-8 h-8 text-white" />}
          color={"bg-pink-500"}
          title={"مبيعات "}
          value={sales}
          footer={"اخر شهر"}
          footervalue={lastSales}
          footercolor={"text-green-400"}
        />
        <CiCard
          icon={<ReceiptRefundIcon className="w-8 h-8 text-white" />}
          color={"bg-trueblue"}
          title={"الرتور"}
          value={returns}
          footer={"اخر شهر"}
          footervalue={lastReturns}
          footercolor={"text-green-400"}
        />
      </div>
      <div className="w-full overflow-auto h-fit">
        <CiTable2
          TABS={TABS}
          TABLE_HEAD={TABLE_HEAD}
          TABLE_ROWS={order2}
          count={count}
          max={max}
          page={Math.ceil(min / max + 1)}
          onChangePage={(value) => setMin(value)}
          onChangeName={(value) => setName(value)}
          onChangeTab={(value) => setType(value)}
          onRefrech={() => setForceRendre((prev) => prev + 1)}
          onReverse={() => setReverse((prev) => (prev ? 0 : 1))}
        />
      </div>
    </>
  );
}
