"use client";
import React, { useEffect, useRef, useState } from "react";
import * as x from "./import";
export default function AddINput({ num, onChanges }) {
  const [color, setColor] = useState("");
  const [photos, setphotos] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [quntity, setQuntity] = useState("");
  useEffect(() => {
    onChanges({
      color,
      photos,
      sizes,
      quntity,
      num,
    });
  }, [color, photos, sizes, quntity]);
  return (
    <div className="flex flex-col items-center md:flex-row md:justify-between md gap-4 w-full">
      <p>- {num} -</p>
      <x.Input
        value={color}
        onChange={(e) => setColor(e.currentTarget.value)}
        label="لون"
        type="text"
      ></x.Input>
      <label
        htmlFor="image"
        className="m-2 bg-scandaryColor  text-white rounded-lg px-4 py-2 cursor-pointer hover:opacity-50 transition-all ease-in-out  font-Hacen-Tunisia"
      >
        صور
      </label>
      <input
        multiple
        onChange={(e) => setphotos(e.currentTarget.files)}
        type="file"
        className="hidden"
        name="image"
        id="image"
      />
      <x.Input
        onChange={(e) => setSizes(e.currentTarget.value.split(" "))}
        label="احجام"
        type="text"
      ></x.Input>
      <x.Input
        value={quntity}
        onChange={(e) => setQuntity(e.currentTarget.value)}
        label="كمية"
        type="text"
      ></x.Input>
    </div>
  );
}
