"use client";
import React, { useState } from "react";
import { Button, IconButton, Input, Option, Select } from "./import";
import { GiPerspectiveDiceSixFacesOne } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { addCoupon } from "../redux/couponsReducer";
import { toasty } from "./toast";
export default function Promo() {
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState();
  const [type, setType] = useState("porcent");
  const [max2, setMax2] = useState(1);
  const [expireDay, setExpireDay] = useState();
  const dispatch = useDispatch();
  const generatePromoCode = () => {
    // List of words for the promo code
    const words = [
      "SALE",
      "DISCOUNT",
      "SUMMER",
      "SAVE",
      "BARGAIN",
      "DEAL",
      "FALL",
      "WINTER",
      "SPRING",
      "HOLIDAY",
      "SPECIAL",
      "OFFER",
      "CLEARANCE",
      "FREE",
      "SHIP",
      "GIFT",
      "JULY",
      "HALLOWEEN",
    ];

    const randomWord = words[Math.floor(Math.random() * words.length)];

    const randomNumber = Math.floor(Math.random() * 90) + 10;

    const code = randomWord + randomNumber.toString();

    setPromoCode(code);
  };
  const handlechange = (e) => {
    setPromoCode(e.target.value);
    console.log(e.target.value);
  };
  const postCode = () => {
    const req = {
      code: promoCode,
      price: discount,
      porcent: discount,
      max: max2,
      expireAt: expireDay
        ? new Date(Date.now() + expireDay * 1000 * 60 * 60 * 24)
        : undefined,
    };
    if (type == "porcent") {
      delete req.price;
    } else {
      delete req.porcent;
    }
    if (!expireDay) {
      delete req.expireAt;
    }
    dispatch(addCoupon(req))
      .unwrap()
      .catch((err) => {
        toasty(err?.response?.data || "فشل اضافة التخفيض", {
          type: "error",
          toastId: "addCoupon",
          autoClose: 5000,
        });
        console.error(err);
      });
  };
  return (
    <div className="w-fit flex flex-col justify-center md:justify-start items-center gap-4">
      <Input
        label="التخفيض "
        value={discount}
        min={1}
        onChange={(e) => setDiscount(e.currentTarget?.value)}
        type="number"
      />
      <Select label="نوع التخفيض" value={type} onChange={(e) => setType(e)}>
        <Option value="porcent">نسبة مئوية</Option>
        <Option value="price">ثابت</Option>
      </Select>
      <Input
        label="التكرار "
        type="number"
        min={1}
        value={max2}
        onChange={(e) => setMax2(e.currentTarget?.value)}
      />
      <Input
        label="عدد الايام "
        type="number"
        value={expireDay}
        onChange={(e) => setExpireDay(e.currentTarget?.value)}
      />
      <Input label="الكود" value={promoCode} onChange={handlechange} />
      <div className="flex flex-row  justify-between  items-center gap-4">
        <IconButton
          size="lg"
          color="cyan"
          className="w-24 h-10 rounded-lg"
          onClick={generatePromoCode}
        >
          <GiPerspectiveDiceSixFacesOne className="h-8 w-8" />
        </IconButton>
        <Button onClick={postCode} className="font-Hacen-Tunisia">
          {" "}
          ارسل
        </Button>
      </div>
    </div>
  );
}
