"use client";
import React, { useEffect, useRef, useState } from "react";
import * as x from "./import";
import { MinusIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";
export default function AddINput({ num, onChanges, onDelete, photo, onShow }) {
  const [color, setColor] = useState("");
  const [photos, setphotos] = useState([]);
  const [photosUrl, setphotosUrl] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [quntity, setQuntity] = useState("");
  const [first, setFirst] = useState(true);
  useEffect(() => {
    onChanges &&
      onChanges({
        color,
        sizes,
        quntity,
        num,
      });
  }, [color, sizes, quntity]);
  useEffect(() => {
    onChanges &&
      onChanges({
        photos,
        num,
        photosUrl,
      });
  }, [photosUrl]);
  useEffect(() => {
    setColor(photo?.color || "#000");
    photo &&
      (setQuntity(photo?.quntity),
      setSizes(photo?.sizes),
      setphotos(photo?.photos));
  }, []);

  useEffect(() => {}, [photos]);
  const addPhoto = (e) => {
    if (!e.currentTarget?.files.length) return;
    setphotosUrl([]);
    setphotos([]);
    for (const photo2 of e.currentTarget.files) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(photo2);
      fileReader.addEventListener("loadend", () => {
        setphotos((prev) => [...prev, photo2]);
        setphotosUrl((prev) => [...prev, fileReader.result]);
      });
    }
  };
  return (
    <div className="flex flex-col items-center md:flex-row md:justify-between md gap-4 w-full">
      <x.IconButton
        disabled={num == 0}
        onClick={() => onDelete(num)}
        color="red"
        className="p-5 bg-transparent"
      >
        <MinusIcon className="h-5 w-5 text-red-600" />
      </x.IconButton>
      <input
        className="min-w-[50px] border-none"
        value={color}
        defaultValue={color}
        onChange={(e) => setColor(e.currentTarget.value)}
        id="nativeColorPicker1"
        type="color"
      />
      <>
        <label
          htmlFor={`image${num}`}
          className="m-2 bg-scandaryColor  text-white rounded-lg px-4 py-2 cursor-pointer hover:opacity-50 transition-all ease-in-out  font-Hacen-Tunisia"
        >
          صور
        </label>
        <input
          multiple
          onChange={addPhoto}
          type="file"
          className="hidden"
          id={`image${num}`}
        />
      </>

      <x.Input
        onChange={(e) => setSizes(e.currentTarget.value.split(","))}
        label="احجام"
        value={sizes?.toString().replace(" ", ",")}
        type="text"
      ></x.Input>
      <x.Input
        value={quntity}
        onChange={(e) => setQuntity(e.currentTarget.value)}
        label="كمية"
        type="text"
      ></x.Input>
      <div>
        {" "}
        <Button onClick={() => onShow(num)}>اظهار</Button>
      </div>
    </div>
  );
}
