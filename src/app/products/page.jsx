"use client";
import React, { useEffect, useState } from "react";
import SpeedyDial from "../components/speedDial";
import {
  CubeIcon,
  CurrencyDollarIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import CiCard from "../components/cards";
import { ReceiptRefundIcon } from "@heroicons/react/24/solid";
import CiTable from "../components/table";
import ProductTable from "../components/ProductTable";
import Gallary from "../components/gallary";
import Promo from "../components/promo";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  fetchProductsStatistiques,
} from "../redux/productsReducer";
import { toast } from "react-toastify";
const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "حذاء",
    value: "1 حذاء",
  },
  {
    label: "حذاء",
    value: "2 حذاء",
  },
  {
    label: "حذاء",
    value: "3 حذاء",
  },
];

const TABLE_HEAD = ["المنتج", "الكمية", "ريل", "تاريخ الاضافة", "تخفيض", ""];

const TABLE_ROWS = [
  {
    img: "https://images.pexels.com/photos/2783873/pexels-photo-2783873.jpeg?auto=compress&cs=tinysrgb&w=600",
    name: "adidas1",
    price: "77$",
    stock: "77",
    type: "حذاء",
    reel: "#",
    reelid: "ttt",
    date: "23/04/18",
  },
  {
    img: "https://images.pexels.com/photos/2783873/pexels-photo-2783873.jpeg?auto=compress&cs=tinysrgb&w=600",
    name: "adidas2",
    price: "77$",
    stock: "65",
    type: "حذاء",
    reel: "#",
    reelid: "ttt",
    date: "23/04/18",
  },
  {
    img: "https://images.pexels.com/photos/2783873/pexels-photo-2783873.jpeg?auto=compress&cs=tinysrgb&w=600",
    name: "adidas3",
    price: "77$",
    stock: "59",
    type: "حذاء",
    reel: "#",
    reelid: "ttt",
    date: "19/09/17",
  },
  {
    img: "https://images.pexels.com/photos/2783873/pexels-photo-2783873.jpeg?auto=compress&cs=tinysrgb&w=600",
    name: "adidas4",
    price: "77$",
    stock: "55",
    type: "حذاء",
    reel: "#",
    reelid: "ttt",
    date: "24/12/08",
  },
  {
    img: "https://images.pexels.com/photos/2783873/pexels-photo-2783873.jpeg?auto=compress&cs=tinysrgb&w=600",
    name: "adidas5",
    price: "77$",
    stock: "52",
    type: "حذاء",
    reel: "#",
    reelid: "ttt",
    date: "04/10/21",
  },
];
const max=10
export default function page() {
  const products2 = useSelector((store) => store.products).products.products;
  const [min, setMin] = useState(0);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const {
    products: { types },
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
  } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductsStatistiques())
      .unwrap()
      .catch((err) => console.error(err));
  }, []);
  useEffect(() => {
    dispatch(fetchProducts({ min, name, type }))
      .unwrap()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, [min, name, type]);
  return (
    <div className="shadow-lg rounded-xl h-fit md:h-full w-full grid row-span-3 mx-5  bg-white">
      <SpeedyDial />
      <div className="h-1/3 m-5 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4 xl:gap-x-8">
        <CiCard
          icon={<CubeIcon className="w-8 h-8 text-white" />}
          color={"bg-primaryColor"}
          title={"منتجات"}
          value={products}
          footer={"الشهر السابق"}
          footervalue={lastProducts}
          footercolor={"text-green-400"}
        />
        <CiCard
          icon={<HeartIcon className="w-8 h-8 text-white" />}
          color={"bg-azure"}
          title={"اعحاب"}
          value={likes}
          footer={"الشهر السابق"}
          footervalue={lastLikes}
          footercolor={"text-red-400"}
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
        />
      </div>
    </div>
  );
}
