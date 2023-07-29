"use client";
import CiCard from "../components/cards";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  PlusCircleIcon,
  CameraIcon,
  UserIcon,
  CurrencyPoundIcon,
  CurrencyDollarIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import SpeedyDial from "../components/speedDial";
import CiTable from "../components/table";
import { useEffect, useState } from "react";
import { Axios } from "../../../lib/axios";
const TABS = [
  {
    label: "الكل",
    value: "all",
  },
  {
    label: "Google",
    value: "google",
  },
  {
    label: "Meta",
    value: "meta",
  },
];

const TABLE_HEAD = ["المستخدمين", "الكمية", "حساب", "سجل"];

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
export default function Home() {
  const [users, setUser] = useState([]);
  const [nUsers, setNUser] = useState();
  const [sales, setSales] = useState();
  const [profits, setProfits] = useState();
  const [views, setViews] = useState();
  useEffect(() => {
    Axios.get("/users")
      .then((res) => {
        res.data?.map((e) => {
          setUser((prev) => [
            ...prev,
            {
              img: e?.Photo,
              name: e?.firstName + "-" + e?.lastName,
              email: e?.email,
              provider: e?.provider,
              items: e?.products,
              paid: e?.price,
              subsicribed: false,
              date: formatDate(e?.createAt),
            },
          ]);
        });
      })
      .catch((err) => console.error(err));
    Axios.get("/dashboard").then((res) => {
      setNUser(res.data?.users);
      setViews(res.data?.views);
      setProfits(res.data?.profits);
      setSales(res.data?.sales);
    });
  }, []);
  return (
    <div className="shadow-lg p-1 m-1 rounded-xl h-fit md:h-full w-fit md:w-full  grid row-span-3 md:m-5 md:p-5  bg-white">
      <SpeedyDial />
      <div className="h-1/3 m-5 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4 xl:gap-x-8">
        <CiCard
          icon={<UserIcon className="w-8 h-8 text-white" />}
          color={"bg-scandaryColor"}
          title={"المستخدمين"}
          value={nUsers}
          footer={"الشهر الماضي"}
          footervalue={"%20+"}
          footercolor={"text-green-400"}
        />
        <CiCard
          icon={<ShoppingBagIcon className="w-8 h-8 text-white" />}
          color={"bg-azure"}
          title={"تم بيعه"}
          value={sales}
          footer={"الشهر الماضي"}
          footervalue={"%1-"}
          footercolor={"text-red-400"}
        />
        <CiCard
          icon={<CurrencyDollarIcon className="w-8 h-8 text-white" />}
          color={"bg-pink-500"}
          title={"الارباح"}
          value={`${profits}DZ`}
          footer={"الشهر الماضي"}
          footervalue={"%5+"}
          footercolor={"text-green-400"}
        />
        <CiCard
          icon={<EyeIcon className="w-8 h-8 text-white" />}
          color={"bg-red-400"}
          title={"المشاهدات"}
          value={views}
          footer={"الشهر الماضي"}
          footervalue={"%10+"}
          footercolor={"text-green-400"}
        />
      </div>

      <div className="w-">
        <CiTable
          TABS={TABS}
          TABLE_HEAD={TABLE_HEAD}
          TABLE_ROWS={users}
          Header={"المستخدمون الاوفياء"}
          subheader={"عرض معلومات حول هؤلاء المستخدمين"}
        />
      </div>
    </div>
  );
}
