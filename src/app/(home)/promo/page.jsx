"use client";
import React, { useState, useEffect } from "react";
import {
  CubeIcon,
  CurrencyDollarIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import CiCard from "../../components/cards";
import Promo from "../../components/promo";
import { BiSolidCoupon } from "react-icons/bi";
import { FcExpired } from "react-icons/fc";
import CiPromoTable from "../../components/tablepromo";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoupon } from "../../redux/couponsReducer";
const TABS = [
  {
    label: "All",
    value: undefined,
  },
  {
    label: "استعمل",
    value: true,
  },
  {
    label: "لم يستعمل",
    value: false,
  },
];
const TABS2 = [
  {
    label: "All",
    value: undefined,
  },
  {
    label: "صالح",
    value: false,
  },
  {
    label: "انتهاء الصلحية",
    value: true,
  },
];
const TABLE_HEAD = [
  "الكود",
  "الاستعمال",
  "المتبقي",
  "صالح/غير صالح",
  "تاريخ الاضافة",
  "تاريخ انتهاء الصلاحية",
  "",
];

const TABLE_ROWS = [
  {
    Promocode: "vine33",
    percentage: "21%",
    Used: true,
    createDate: "7/7/2023",
    useDate: "6/5/2023",
  },
  {
    Promocode: "summer77",
    percentage: "22%",
    Used: true,
    createDate: "6/5/2023",
    useDate: "6/5/2023",
  },
  {
    Promocode: "School01",
    percentage: "23%",
    Used: true,
    createDate: "5/9/2023",
    useDate: "6/5/2023",
  },
  {
    Promocode: "wow12",
    percentage: "24%",
    Used: true,
    createDate: "5/5/2023",
    useDate: "6/5/2023",
  },
  {
    Promocode: "real20",
    percentage: "25%",
    Used: true,
    createDate: "5/2/2023",
    useDate: "6/5/2023",
  },
];
const max = 10;
export default function page() {
  const [min, setMin] = useState(0);
  const [name, setName] = useState("");
  const [used, setUsed] = useState();
  const [expire, setExpire] = useState();
  const {
    statistique: {
      coupon,
      usedCoupon,
      lastUsedCoupon,
      lastCoupon,
      restCoupon,
      lastRestCoupon,
      couponSales,
      lastCouponSales,
    },
  } = useSelector((store) => store.statistique);
  const coupons = useSelector((store) => store.coupons).coupon.coupon;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCoupon({ min, used, expire, name })).unwrap().catch(err=>{
		toasty(err?.response?.data || "فشل اضافة التخفيض", {
			type: "error",
			toastId: "addCoupon",
			autoClose: 5000,
		  });
		  console.error(err);
	});
  }, [min, name, used, expire]);
  return (
    <>
      <div className="h-1/3 m-5 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4 xl:gap-x-8">
        <CiCard
          icon={<BiSolidCoupon className="h-8 w-8 text-white" />}
          color={"bg-primaryColor"}
          title={"promo codes"}
          value={coupon}
          footer={"الشهر السابق"}
          footervalue={lastCoupon}
          footercolor={"text-green-400"}
        />
        <CiCard
          icon={<HeartIcon className="w-8 h-8 text-white" />}
          color={"bg-azure"}
          title={"المتبقي"}
          value={restCoupon}
          footer={"الشهر السابق"}
          footervalue={lastRestCoupon}
          footercolor={"text-red-400"}
        />
        <CiCard
          icon={<CurrencyDollarIcon className="w-8 h-8 text-white" />}
          color={"bg-pink-500"}
          title={" "}
          value={`${couponSales} Dz`}
          footer={"الشهر السابق"}
          footervalue={`${lastCouponSales} Dz`}
          footercolor={"text-green-400"}
        />
        <CiCard
          icon={<FcExpired className="w-8 h-8 text-white" />}
          color={"bg-trueblue"}
          title={"المستخذم"}
          value={usedCoupon}
          footer={"الشهر السابق"}
          footervalue={lastUsedCoupon}
          footercolor={"text-green-400"}
        />
      </div>
      <div className=" flex flex-row items-center justify-center">
        <Promo />
      </div>
      <div>
        <CiPromoTable
          TABLE_HEAD={TABLE_HEAD}
          TABLE_ROWS={coupons}
          TABS={TABS}
          TABS2={TABS2}
          Header={"جدول الاكواد"}
          subheader={"جدول لعرض الاكواد التخفيض"}
          count={coupons}
          max={max}
          page={Math.ceil(min / max + 1)}
          onChangePage={(value) => setMin(value)}
          onChangeName={(value) => setName(value)}
          onChangeTab={(value) => setUsed(value)}
          onChangeTab2={(value) => setExpire(value)}
        />
      </div>
    </>
  );
}
