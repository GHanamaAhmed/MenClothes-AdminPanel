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
import { useDispatch, useSelector } from "react-redux";
import { fetchStatistique, fetchUsers } from "../redux/controlPanelReducer";
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

var max = 10;
export default function Home() {
  const [tab, setTab] = useState("all");
  const [input, setInput] = useState("");
  const [min, setMin] = useState(0);
  const dispatch = useDispatch();
  const {
    users: { users },
    statistique: {
      nUsers,
      sales,
      profits,
      views,
      lastUsers,
      lastProfits,
      lastSales,
    },
  } = useSelector((store) => store.controlPanel);
  useEffect(() => {
    users?.length ||
      dispatch(fetchStatistique())
        .unwrap()
        .catch((err) => console.error(err));
  }, []);
  useEffect(() => {
    dispatch(fetchUsers({ tab, input, min }))
      .unwrap()
      .catch((err) => console.error(err));
    console.log(users);
  }, [input, tab, min]);
  return (
    <div className="shadow-lg p-1 m-1 rounded-xl w-full  grid row-span-3 md:m-5 md:p-5  bg-white">
      <SpeedyDial />
      <div className="h-1/3 m-5 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4 xl:gap-x-8">
        <CiCard
          icon={<UserIcon className="w-8 h-8 text-white" />}
          color={"bg-scandaryColor"}
          title={"المستخدمين"}
          value={nUsers}
          footer={"الشهر الماضي"}
          footervalue={lastUsers}
          footercolor={"text-green-400"}
        />
        <CiCard
          icon={<ShoppingBagIcon className="w-8 h-8 text-white" />}
          color={"bg-azure"}
          title={"تم بيعه"}
          value={sales}
          footer={"الشهر الماضي"}
          footervalue={lastSales}
          footercolor={"text-red-400"}
        />
        <CiCard
          icon={<CurrencyDollarIcon className="w-8 h-8 text-white" />}
          color={"bg-pink-500"}
          title={"الارباح"}
          value={`${profits}DZ`}
          footer={"الشهر الماضي"}
          footervalue={lastProfits}
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
          tab={tab}
          count={nUsers}
          max={max}
          onChangeTab={(value) => setTab(value)}
          onChangeInpute={(value) => setInput(value)}
          onChangePage={(value) => setMin((value - 1) * max)}
        />
      </div>
    </div>
  );
}
