"use client";
import React, { useEffect, useState } from "react";

import { IconButton } from "./import";
import { MinusIcon, SquaresPlusIcon } from "@heroicons/react/24/outline";

export default function Gallary({ images, onRemove, indexPhotos, onAdd }) {
  const [photos, setphotos] = useState();
  const [photosUrl, setphotosUrl] = useState();
  useEffect(() => {
    if (photos) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(photos);
      fileReader.addEventListener("loadend", () => {
        setphotosUrl(fileReader.result);
      });
    }
  }, [photos]);
  useEffect(() => {
    photosUrl && onAdd(indexPhotos, photos, photosUrl);
  }, [photosUrl]);
  return (
    <div className="relative flex items-center justify-start gap-2 flex-nowrap overflow-x-auto overflow-y-hidden w-full">
      {images?.map((image, index) => (
        <div key={index}>
          <img
            crossOrigin="anonymous"
            src={image}
            alt="gallary"
            className="w-[200px] h-[200px] min-w-[200px] object-cover rounded-lg shadow-lg hover:w-[225px] hover:h-[225px] hover:shadow-xl transition-all shadow-gray-600"
          />
          <IconButton
            onClick={() => onRemove(indexPhotos, index)}
            className=" -top-12 -right-1 rounded-lg z-50 bg-transparent  text-black shadow-md hover:shadow-lg hover:shadow-red-600/50"
            color="red"
          >
            <MinusIcon className="h-5 w-5 text-red-600" />
          </IconButton>
        </div>
      ))}
      <label htmlFor="file-input" className="cursor-pointer rounded-lg  p-2">
        <SquaresPlusIcon className="h-10 w-10 text-blue-500 m-4" />
        <input
          onChange={(e) => setphotos(e.currentTarget.files[0])}
          type="file"
          name="file-input"
          id="file-input"
          className="hidden"
        />
      </label>
    </div>
  );
}
