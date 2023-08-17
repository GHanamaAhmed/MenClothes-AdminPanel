"use client";
import React, { useEffect, useState } from "react";
import SpeedyDial from "../../components/speedDial";
import {
  CubeIcon,
  CurrencyDollarIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import CiCard from "../../components/cards";
import { ReceiptRefundIcon } from "@heroicons/react/24/solid";
import CiTable from "../../components/table";
import ProductTable from "../../components/ProductTable";
import Gallary from "../../components/gallary";
import Promo from "../../components/promo";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  fetchProductsStatistiques,
} from "../../redux/productsReducer";
import { toast } from "react-toastify";
import { fetchStatistique } from "../../redux/controlPanelReducer";
const TABLE_HEAD = ["المنتج", "الكمية", "ريل", "تاريخ الاضافة", "تخفيض", ""];


const max = 6;
export default function Page() {
  const products2 = useSelector((store) => store.products).products.products;
  const [min, setMin] = useState(0);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [forceRendre, setForceRendre] = useState(0);
  const [reverse, setReverse] = useState(0);
  const {
    products: { types },
  } = useSelector((state) => state.products);
  const {
    statistique: {
      products,
      lastProducts,
      likes,
      lastLikes,
      sales,
      lastSales,
      returns,
      lastReturns,
    },
  } = useSelector((state) => state.statistique);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts({ min, name, type,reverse }))
      .unwrap()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, [min, name, type, forceRendre, reverse]);
  useEffect(() => {
    setInterval(() => {
      setForceRendre((prev) => prev + 1);
    }, 1000 * 120);
  }, []);
  return (
    <>
      <div className="h-1/3 m-5 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4 xl:gap-x-8">
        <CiCard
          icon={<CubeIcon className="w-8 h-8 text-white" />}
          color={"bg-primaryColor"}
          title={"منتجات"}
          value={products}
           footer={"اخر شهر"}
          footervalue={lastProducts}
          footercolor={"text-green-400"}
        />
        <CiCard
          icon={<HeartIcon className="w-8 h-8 text-white" />}
          color={"bg-azure"}
          title={"اعحاب"}
          value={likes}
           footer={"اخر شهر"}
          footervalue={lastLikes}
          footercolor={"text-red-400"}
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
      <div>
        <ProductTable
          TABLE_HEAD={TABLE_HEAD}
          TABLE_ROWS={products2}
          TABS={types}
          Header={"products"}
          count={products}
          max={max}
          page={Math.ceil(min / max + 1)}
          subheader={"see products"}
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
