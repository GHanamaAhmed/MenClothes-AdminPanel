"use client";
import React, { useEffect, useRef, useState } from "react";
import * as x from "./import";
import { Textarea } from "@material-tailwind/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import AddINput from "./addINput";
import { Axios } from "../../../lib/axios";
export default function AddProduct() {
  const [name, setName] = useState();
  const [type, setType] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [y, sety] = useState(1);
  const [Details, SetDetails] = useState([{}]);
  const [thumbanil, setThumbanil] = useState();

  const [open, setOpen] = useState(false);
  const toggleOpen = () => {
    setOpen(!open);
  };
  const remDetails = () => {
    sety((prev) => prev - 1);
  };
  const changeInpute = (e) => {
    const nPhotos = e?.photos?.length;
    SetDetails((prev) => {
      prev[e.num] = {
        color: e?.color,
        sizes: e?.sizes,
        quntity: e?.quntity,
        photos: e?.photos,
        nPhotos,
      };
      return [...prev];
    });
  };
  const addProduct = () => {
    let photos = [];
    const details = Details.map((e, i) => {
      photos = [...photos, ...e.photos];
      delete e.photos;
      return e;
    });
    const formData = new FormData();
    formData.append("name", name);
    formData.append("type", type);
    formData.append("description", description);
    formData.append("thumbanil", thumbanil);
    details.map((e, i) => {
      formData.append("details", e);
      formData.append("photos", photos[i]);
    });
    Axios.post("/products", formData)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };
  return (
    <x.Card className="mx-auto  max-w-none w-full my-2 overflow-y-scroll max-h-[30rem] shadow-none">
      <x.CardBody className="flex flex-col w-full  gap-4 justify-evenly items-center ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          <x.Input
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            label="الاسم"
            size="md"
            name="name"
          />
          <x.Input
            value={type}
            onChange={(e) => setType(e.currentTarget.value)}
            label="النوع"
            size="md"
            name="type"
          />
          <x.Input
            value={price}
            onChange={(e) => setPrice(e.currentTarget.value)}
            label="السعر"
            size="md"
            name="price"
          />
          <div className="md:col-span-3">
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.currentTarget.value)}
              label="الوصف"
              size="md"
              name="description"
            />
          </div>
          <x.Button>صورة المنتج</x.Button>
          <input
            hidden
            onChange={(e) => setThumbanil(e.currentTarget.files[0])}
            type="file"
            name=""
            id=""
          />
        </div>
        <x.Button
          onClick={toggleOpen}
          className="font-Hacen-Tunisia"
          variant="outlined"
          color="green"
        >
          اضف موصفات المنتج
        </x.Button>
        <x.Card
          className={`flex transition-all flex-row items-center justify-center shadow-none  m-2  md:w-fit  ${
            open ? "" : "hidden"
          }`}
        >
          <x.CardBody className="w-fit flex flex-row items-end justify-center  ">
            <div className="flex flex-col gap-4 justify-evenly items-center">
              {[...Array(y)].map((e, i) => (
                <div key={i}>
                  <AddINput num={i} onChanges={changeInpute} />
                </div>
              ))}
              <div className="flex flex-row gap-4 justify-evenly items-center">
                <x.Button
                  onClick={remDetails}
                  className={`z-50   items-center justify-center gap-2 ${
                    y <= 1 ? "hidden" : ""
                  } `}
                  color="red"
                >
                  <MinusIcon className="h-5 w-5"></MinusIcon>
                </x.Button>
                <x.Button
                  onClick={() => {
                    sety((prev) => prev + 1);
                    SetDetails([...Details, {}]);
                  }}
                  variant="gradient"
                  className="flex flex-row items-center justify-center gap-2"
                >
                  <PlusIcon className="h-5 w-5"></PlusIcon>
                </x.Button>
              </div>
            </div>
          </x.CardBody>
        </x.Card>
      </x.CardBody>
    </x.Card>
  );
}
