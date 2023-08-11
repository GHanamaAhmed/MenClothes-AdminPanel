"use client";
import React, { useEffect, useRef, useState } from "react";
import * as x from "./import";
import { MinusIcon } from "@heroicons/react/24/solid";
export default function AddINput({ num, onChanges, onDelete, photo, onShow }) {
  const [color, setColor] = useState("");
  const [photos, setphotos] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [quntity, setQuntity] = useState("");
  useEffect(() => {
    onChanges &&
      onChanges({
        id:photo?.id,
        color,
        photos,
        sizes,
        quntity,
        num,
      });
  }, [color, photos, sizes, quntity]);
  useEffect(() => {
    photo &&
      (setColor(photo?.color),
      setQuntity(photo?.quntity),
      setSizes(photo?.sizes));
  }, [photo]);
  return (
    <div className="flex flex-col items-center md:flex-row md:justify-between md gap-4 w-full">
      <x.IconButton
        disabled={num == 0}
        onClick={() => onDelete(photo?.id,num)}
        color="red"
        className="p-5 bg-transparent"
      >
        <MinusIcon className="h-5 w-5 text-red-600" />
      </x.IconButton>
      <x.Input
        value={color}
        defaultValue={color}
        onChange={(e) => setColor(e.currentTarget.value)}
        label="لون"
        type="text"
      ></x.Input>
      {!photo && (
        <>
          <label
            htmlFor={`image${num}`}
            className="m-2 bg-scandaryColor  text-white rounded-lg px-4 py-2 cursor-pointer hover:opacity-50 transition-all ease-in-out  font-Hacen-Tunisia"
          >
            صور
          </label>
          <input
            multiple
            onChange={(e) => setphotos(e.currentTarget?.files)}
            type="file"
            className="hidden"
            id={`image${num}`}
          />
        </>
      )}
      <x.Input
        onChange={(e) => setSizes(e.currentTarget.value.split(" "))}
        label="احجام"
        value={sizes?.toString()}
        type="text"
      ></x.Input>
      <x.Input
        value={quntity}
        onChange={(e) => setQuntity(e.currentTarget.value)}
        label="كمية"
        type="text"
      ></x.Input>
      {photo && <x.Button onClick={() => onShow(photo?.id)}>اظهار</x.Button>}
    </div>
  );
}
