"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import * as x from "./import";
import { Textarea } from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import AddINput from "./addINput";
import { Axios } from "../../../lib/axios";
import { toasty } from "./toast";
import { useDispatch } from "react-redux";
import { updateProduct } from "../redux/productsReducer";
import { convertUrlToImageFile } from "../../../lib/images";
import Gallary from "./gallary";
export default function Edit2({ onShowProduct, isOpen, onClose, product }) {
  const dispath = useDispatch();
  const [open2, setOpen2] = useState(false);
  const [name, setName] = useState();
  const [type, setType] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [y, sety] = useState(1);
  const [Details, SetDetails] = useState([{}]);
  const [thumbanil, setThumbanil] = useState();
  const [thumbanilUrl, setThumbanilUrl] = useState();
  const [open, setOpen] = useState(false);
  const [currentPhotos, setCourentPhotos] = useState(null);
  useLayoutEffect(() => {
    setName(product?.name);
    setType(product?.type);
    setPrice(product?.price);
    setDescription(product?.description);
    SetDetails([]);
    product?.photos?.map(async (e, i) => {
      let photos = [];
      await Promise.all(
        e?.photos?.map(async (p) => {
          await convertUrlToImageFile(p).then(
            (img) => (photos = [...photos, img])
          );
        })
      );
      SetDetails((prev) => [
        ...prev,
        {
          color: e?.color,
          sizes: e.sizes,
          quntity: e?.quntity,
          nPhotos: e?.photos?.length,
          photosUrl: e?.photos,
          photos,
        },
      ]);
    });
    convertUrlToImageFile(product?.thumbanil).then((img) => {
      setThumbanil(img);
    });
  }, [product]);
  useEffect(() => {
    setOpen2(isOpen);
  }, [isOpen]);
  useEffect(() => {
    if (thumbanil) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(thumbanil);
      fileReader.addEventListener("loadend", () => {
        setThumbanilUrl(fileReader.result);
      });
    }
  }, [thumbanil]);
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
    const nPhotos = e?.photos?.length || 0;
    SetDetails((prev) => {
      prev[e.num] = {
        ...prev[e.num],
        ...e,
        photos:
          prev[e?.num]?.photos?.length && e?.photos
            ? [...prev[e?.num]?.photos, ...e?.photos]
            : e?.photos || prev[e?.num]?.photos,
        nPhotos: (prev[e.num]?.nPhotos || 0) + nPhotos,
        photosUrl:
          prev[e?.num].photosUrl?.length && e?.photosUrl
            ? [...prev[e?.num].photosUrl, ...e?.photosUrl]
            : e?.photosUrl || prev[e?.num].photosUrl,
      };
      return [...prev];
    });
  };
  const addProduct = () => {
    let photos = [];
    let details = [];
    const formData = new FormData();
    if (!name || !price || !thumbanil) {
      toasty("ادخل المعلومات اللازمة!", {
        type: "warning",
        toastId: "updateProduct",
        autoClose: 5000,
      });
      return;
    }
    if (
      Details.every(
        (e) => e?.color && e?.sizes?.length > 0 && e?.nPhotos && e?.quntity
      )
    ) {
      details = Details.map((e, i) => {
        photos = [...photos, ...e.photos];
        const ec = { ...e };
        delete ec.photos;
        delete ec.photosUrl;
        delete ec.num;
        return ec;
      });
      formData.append("details", JSON.stringify(details));
      photos?.map((e, i) => {
        formData.append("photos", photos[i]);
      });
    } else {
      toasty("ادخل المعلومات اللازمة!", {
        type: "warning",
        toastId: "updateProduct",
        autoClose: 5000,
      });
      return;
    }
    formData.append("id", product?._id);
    price && formData.append("price", price);
    name && formData.append("name", name);
    type && formData.append("type", type);
    description && formData.append("description", description);
    thumbanil && formData.append("thumbanil", thumbanil);
    Axios.request({
      method: "put",
      url: "/products",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (p) => {
        const progress = p.loaded / p.total;
        toasty(`تم رفع ${(progress * 100).toFixed(0)} من 100`, {
          toastId: "updateProduct",
          progress,
        });
      },
    })
      .then((res) => {
        toasty("تم تعديل المنتج بنجاح", {
          type: "success",
          toastId: "updateProduct",
          autoClose: 5000,
        });
        dispath(updateProduct(res.data));
        onClose(!open2);
      })
      .catch((err) => {
        toasty(`${err?.response?.data || "فشل تعديل المنتج"}`, {
          type: "error",
          toastId: "updateProduct",
          autoClose: 5000,
        });
        console.error(err);
      });
  };
  const removePhoto = (i, ind) => {
    SetDetails((prev) => {
      let newPrev = [...prev];
      newPrev[i].photosUrl = prev[i]?.photosUrl?.filter((e, i2) => i2 != ind);
      newPrev[i].photos = prev[i]?.photos?.filter((e, i2) => i2 != ind);
      newPrev[i].nPhotos = newPrev[i].nPhotos - 1;
      return newPrev;
    });
  };
  const addPhoto = (i, photo, photourl) => {
    SetDetails((prev) => {
      let newPrev = [...prev];
      newPrev[i].photosUrl = [...newPrev[i].photosUrl, photourl];
      newPrev[i].photos = [...newPrev[i].photos, photo];
      newPrev[i].nPhotos = newPrev[i].nPhotos + 1;
      return newPrev;
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
        تعديل منتج{" "}
      </x.DialogHeader>

      <x.DialogBody
        divider
        className="flex flex-col items-center justify-center gap-4 max-h-[25rem] md:max-h-[30rem]"
      >
        <x.Card className="mx-auto  max-w-none w-full my-2 overflow-y-scroll max-h-[30rem] shadow-none">
          <x.CardBody className="flex flex-col w-full  gap-4 justify-evenly items-center  ">
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
            {thumbanilUrl && (
              <img
                crossOrigin="anonymous"
                src={thumbanilUrl}
                alt="gallary"
                className="w-[200px] h-[200px] min-w-[200px] object-cover rounded-lg shadow-lg hover:w-[225px] hover:h-[225px] hover:shadow-xl transition-all shadow-gray-600"
              />
            )}

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
                  {Details.map((e, i) => (
                    <div key={i}>
                      <AddINput
                        photo={e}
                        num={i}
                        onShow={(value) => setCourentPhotos(value)}
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
                  {currentPhotos !== null && (
                    <Gallary
                      indexPhotos={currentPhotos}
                      images={
                        Details.length && currentPhotos !== null
                          ? Details[currentPhotos]?.photosUrl || []
                          : []
                      }
                      onAdd={addPhoto}
                      onRemove={removePhoto}
                    />
                  )}
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
          color="cyan"
          onClick={addProduct}
          className="mr-1"
        >
          <span>تعديل</span>
        </x.Button>
      </x.DialogFooter>
    </x.Dialog>
  );
}
