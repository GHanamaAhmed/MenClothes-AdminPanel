"use client";
import React, { useEffect, useRef, useState } from "react";
import * as x from "./import";
import { Textarea } from "@material-tailwind/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import AddINput from "./addINput";
import { Axios } from "../../../lib/axios";
import { toasty } from "./toast";
import { useDispatch } from "react-redux";
import { uploadProduct } from "../redux/productsReducer";
export default function AddProduct({ onShowProduct, isOpen, onClose }) {
  const dispath = useDispatch();
  const [open2, setOpen2] = useState(false);
  const [name, setName] = useState();
  const [type, setType] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [y, sety] = useState(1);
  const [Details, SetDetails] = useState([{}]);
  const [thumbanil, setThumbanil] = useState();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen2(isOpen);
  }, [isOpen]);
  const toggleOpen = () => {
    setOpen(!open);
  };
  const toggleOpen2 = () => {
    setOpen2(!open2);
    onClose(!open2);
  };
  const remDetails = (value) => {
    sety((prev) => prev - 1);
    SetDetails((prev) => {
      const halfBeforeTheUnwantedElement = prev.slice(0, value);
      const halfAfterTheUnwantedElement = prev.slice(value + 1);
      return halfBeforeTheUnwantedElement.concat(halfAfterTheUnwantedElement);
    });
  };
  const changeInpute = (e) => {
    const nPhotos = e?.photos?.length;
    console.log(e);
    SetDetails((prev) => {
      prev[e.num] = {
        color: e?.color,
        sizes: e?.sizes,
        quntity: e?.quntity,
        photos: e?.photos,
        nPhotos,
      };
      console.log(prev);
      return [...prev];
    });
  };
  const addProduct = () => {
    let photos = [];
    let details = [];
    const formData = new FormData();
    console.log(Details);
    console.log(
      Details.every(
        (e) => e?.color && e?.sizes?.length > 0 && e?.nPhotos && e?.quntity
      )
    );
    if (
      Details.every(
        (e) => e?.color && e?.sizes?.length > 0 && e?.nPhotos && e?.quntity
      )
    ) {
      details = Details.map((e, i) => {
        photos = [...photos, ...e.photos];
        const ec = { ...e };
        delete ec.photos;
        return ec;
      });
      formData.append("details", JSON.stringify(details));
      details?.map((e, i) => {
        formData.append("photos", photos[i]);
      });
    }
    formData.append("price", price);
    formData.append("name", name);
    formData.append("type", type);
    formData.append("description", description);
    formData.append("thumbanil", thumbanil);
    Axios.request({
      method: "post",
      url: "/products",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (p) => {
        const progress = p.loaded / p.total;
        console.log(progress);
        toasty(`تم رفع ${(progress * 100).toFixed(0)} من 100`, {
          toastId: "uploadProduct",
          progress,
        });
      },
    })
      .then((res) => {
        toasty("تم رفع المنتج بنجاح", {
          type: "success",
          toastId: "uploadProduct",
          autoClose: 5000,
        });
        dispath(uploadProduct(res.data));
        onClose(!open2);
      })
      .catch((err) => {
        toasty(`${err?.response?.data || "فشل رفع المنتج"}`, {
          type: "error",
          toastId: "uploadProduct",
          autoClose: 5000,
        });
        console.error(err);
      });
  };
  return (
    <x.Dialog
      open={open2}
      handler={toggleOpen2}
      className="w-full h-fit"
      size="xl"
    >
      <x.DialogHeader className="flex items-center justify-center gap-4 font-Hacen-Tunisia">
        {" "}
        اضافة منتج{" "}
      </x.DialogHeader>

      <x.DialogBody
        divider
        className="flex flex-col items-center justify-center gap-4 max-h-[30rem]"
      >
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
              <label
                htmlFor="thumbanil"
                className="m-2 bg-scandaryColor text-center  text-white rounded-lg px-4 py-2 cursor-pointer hover:opacity-50 transition-all ease-in-out  font-Hacen-Tunisia"
              >
                صورة المنتج
              </label>
              <input type="file" hidden name="" id="" />
              <input
                hidden
                onChange={(e) => setThumbanil(e.currentTarget.files[0])}
                type="file"
                id="thumbanil"
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
                      <AddINput
                        num={i}
                        onChanges={changeInpute}
                        onDelete={remDetails}
                      />
                    </div>
                  ))}
                  <div className="flex flex-row gap-4 justify-evenly items-center">
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
      </x.DialogBody>
      <x.DialogFooter className="flex items-center justify-end gap-4">
        <x.Button
          variant="text"
          color="red"
          onClick={() => onClose(!open2)}
          className="mr-1"
        >
          <span>اغلاق</span>
        </x.Button>

        <x.Button
          variant="gradient"
          color="blue"
          onClick={() => {
            onClose(!open2);
            onShowProduct();
          }}
          className="mr-1"
        >
          <span>عرض المنتج</span>
        </x.Button>
        <x.Button
          variant="gradient"
          color="cyan"
          onClick={addProduct}
          className="mr-1"
        >
          <span>اضف</span>
        </x.Button>
      </x.DialogFooter>
    </x.Dialog>
  );
}
