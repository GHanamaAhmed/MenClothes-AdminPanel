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
import { toasty } from "../../components/toast";
const TABS = [
  {
    label: "All",
    value: "",
  },
  {
    label: "استعمل",
    value: 1,
  },
  {
    label: "لم يستعمل",
    value: 0,
  },
];
const TABS2 = [
  {
    label: "All",
    value: "",
  },
  {
    label: "صالح",
    value: 0,
  },
  {
    label: "انتهاء الصلحية",
    value: 1,
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

const max = 6;
export default function Page() {
  const [min, setMin] = useState(0);
  const [name, setName] = useState("");
  const [used, setUsed] = useState("");
  const [expire, setExpire] = useState("");
  const [forceRendre, setForceRendre] = useState(0);
  const [reverse, setReverse] = useState(0);
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
  const count = useSelector((store) => store.coupons).coupon.count;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCoupon({ min, used, expire, name, reverse }))
      .unwrap()
      .catch((err) => {
        toasty(err?.response?.data || "فشل اضافة التخفيض", {
          type: "error",
          toastId: "addCoupon",
          autoClose: 5000,
        });
        console.error(err);
      });
  }, [min, name, used, expire, forceRendre, reverse]);
  useEffect(() => {
    setMin(0);
  }, [ name, used, expire]);
  useEffect(() => {
    setInterval(() => {
      setForceRendre((prev) => prev + 1);
    }, 1000 * 20);
  }, []);
  return (
    <>
      <div className="h-1/3 m-5 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4 xl:gap-x-8">
        <CiCard
          icon={<BiSolidCoupon className="h-8 w-8 text-white" />}
          color={"bg-primaryColor"}
          title={"promo codes"}
          value={coupon}
          footer={"اخر شهر"}
          footervalue={lastCoupon}
          footercolor={"text-green-400"}
        />
        <CiCard
          icon={<HeartIcon className="w-8 h-8 text-white" />}
          color={"bg-azure"}
          title={"المتبقي"}
          value={restCoupon}
          footer={"اخر شهر"}
          footervalue={lastRestCoupon}
          footercolor={"text-red-400"}
        />
        <CiCard
          icon={<CurrencyDollarIcon className="w-8 h-8 text-white" />}
          color={"bg-pink-500"}
          title={"نفقات التخفيض"}
          value={`${couponSales?.toFixed(2)} Dz`}
          footer={"اخر شهر"}
          footervalue={`${lastCouponSales?.toFixed(2)} Dz`}
          footercolor={"text-green-400"}
        />
        <CiCard
          icon={<FcExpired className="w-8 h-8 text-white" />}
          color={"bg-trueblue"}
          title={"المستخذم"}
          value={usedCoupon}
          footer={"اخر شهر"}
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
          count={count}
          max={max}
          page={Math.ceil(min / max + 1)}
          onChangePage={(value) => setMin(value)}
          onChangeName={(value) => setName(value)}
          onChangeTab={(value) => setUsed(value)}
          onChangeTab2={(value) => setExpire(value)}
          onRefrech={() => setForceRendre((prev) => prev + 1)}
          onReverse={() => setReverse((prev) => (prev ? 0 : 1))}
        />
      </div>
    </>
  );
}
