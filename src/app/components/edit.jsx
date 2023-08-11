"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Option,
  Select,
} from "./import";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Switch,
  Textarea,
} from "@material-tailwind/react";
import Gallary from "./gallary";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import AddINput from "./addINput";
import { convertUrlToImageFile } from "../../../lib/images";
const products = [
  {
    photos: [
      "https://www.shutterstock.com/shutterstock/photos/1474887965/display_1500/stock-photo-white-t-shirts-mockup-front-and-back-used-as-design-template-1474887965.jpg",
      "https://www.shutterstock.com/shutterstock/photos/1474887965/display_1500/stock-photo-white-t-shirts-mockup-front-and-back-used-as-design-template-1474887965.jpg",
      "https://www.shutterstock.com/shutterstock/photos/1474887965/display_1500/stock-photo-white-t-shirts-mockup-front-and-back-used-as-design-template-1474887965.jpg",
      "https://www.shutterstock.com/shutterstock/photos/1474887965/display_1500/stock-photo-white-t-shirts-mockup-front-and-back-used-as-design-template-1474887965.jpg",
      "https://www.shutterstock.com/shutterstock/photos/1474887965/display_1500/stock-photo-white-t-shirts-mockup-front-and-back-used-as-design-template-1474887965.jpg",
      "https://www.shutterstock.com/shutterstock/photos/1474887965/display_1500/stock-photo-white-t-shirts-mockup-front-and-back-used-as-design-template-1474887965.jpg",
      "https://www.shutterstock.com/shutterstock/photos/1474887965/display_1500/stock-photo-white-t-shirts-mockup-front-and-back-used-as-design-template-1474887965.jpg",
      "https://www.shutterstock.com/shutterstock/photos/1474887965/display_1500/stock-photo-white-t-shirts-mockup-front-and-back-used-as-design-template-1474887965.jpg",
    ],
    color: "white",
    sizes: ["xl", "l"],
    quantity: 15,
  },
];
export default function Edit({ onShowProduct, isOpen, onClose, product }) {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedsize, setSelectedsize] = useState("");
  const [editProduct, setEditProduct] = useState({});
  const [details, setDetails] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(false);
  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);
  useEffect(() => {
    setEditProduct(product);
    setDetails((prev) => {
      return product?.photos?.map((e, i) => {
        const nPhotos = e?.photos?.length;
        return {
          quntity: e?.quntity,
          color: e?.color,
          sizes: e?.sizes,
          nPhotos,
          photos: e.photos,
          photos2: Promise.all(
            e.photos?.map((e, i) => convertUrlToImageFile(e).then((img) => img))
          ),
          id: e?._id,
        };
      });``
    });
    setSelectedColor(product?.photos?.[0]?._id);
  }, [product]);
  useEffect(() => {
    editProduct?.photos?.length &&
      setSelectedColor(editProduct?.photos[0]?._id);
  }, [editProduct]);
  useEffect(() => {
    details?.length &&
      setSelectedsize(
        details[
          editProduct?.photos?.findIndex((el) => el?.id == selectedColor)
        ]?.sizes?.toString()
      );
  }, [selectedColor]);
  useEffect(() => {
    console.log(details);
  }, [details]);
  const handlevalue = () => {
    setValue(!value);
  };
  const handleOpen = () => {
    setOpen(!open);
    onClose(!open);
  };
  return (
    <Dialog open={open} handler={handleOpen} size="xl">
      <DialogHeader className="font-Hacen-Tunisia flex flex-row items-center justify-between gap-2">
        <p>المنتج</p>
        <Switch
          label={`${value ? "اظهار المنتج" : "اخفاء المنتج"}`}
          labelProps={{ className: "text-gray-400 mx-2 text-right" }}
          onChange={handlevalue}
        />
      </DialogHeader>
      <DialogBody divider className="overflow-y-auto h-[30rem]">
        <div className="flex flex-col w-full items-center justify-evenly gap-4">
          <div className="md:grid-cols-3 grid-cols-1 grid w-full gap-4 pt-2 font-Hacen-Tunisia">
            <Input
              label="الاسم"
              defaultValue={editProduct?.name}
              size="md"
              name="name"
              className="font-Hacen-Tunisia w-full"
            />
            <Input
              label="النوع"
              defaultValue={editProduct?.type}
              size="md"
              name="type"
              className="font-Hacen-Tunisia w-full"
            />
            <div className="">
              <Input
                label="السعر"
                defaultValue={editProduct?.price}
                size="md"
                name="price"
                className="font-Hacen-Tunisia w-full"
              />
            </div>
            <div className="md:col-span-3">
              {" "}
              <Textarea
                label="الوصف"
                defaultValue={editProduct?.description}
                size="md"
                name="description"
                className="text-justify font-Hacen-Tunisia w-full"
              />
            </div>
          </div>
          <Gallary
            images={
              details?.length
                ? details?.[details?.findIndex((el) => el?.id == selectedColor)]
                    ?.photos
                : []
            }
          />
          {details?.map((e, i) => (
            <div key={i}>
              <AddINput
                photo={e}
                num={i}
                onShow={(value) => {
                  setSelectedColor(value);
                }}
              />
            </div>
          ))}
          <div className="flex flex-row gap-4 justify-evenly items-center">
            <Button
              onClick={() => setDetails((prev) => [...prev, {}])}
              variant="gradient"
              className="flex flex-row items-center justify-center gap-2"
            >
              <PlusIcon className="h-5 w-5"></PlusIcon>
            </Button>
          </div>
        </div>
      </DialogBody>
      <DialogFooter className="flex items-center justify-end gap-4">
        <Button
          variant="text"
          color="red"
          onClick={handleOpen}
          className="mr-1"
        >
          <span>اغلاق</span>
        </Button>
        <Button variant="gradient" color="cyan" onClick={handleOpen}>
          <span>تعديل</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
