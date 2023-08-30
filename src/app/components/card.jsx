import React from "react";

export default function CardOr({ order }) {
  return (
    <div className="flex px-2 py-5">
      <div className="flex gap-5">
        <img
          crossOrigin="anonymous"
          className="h-28 w-28 rounded-md object-cover"
          src={order?.thumbanil}
          alt=""
        />
        <div className="flex flex-col items-start justify-between">
          <p className="text-black">{order?.name}</p>
          <div className="flex gap-2">
            <p className="text-sm text-lightContent">اللون:</p>
            <div
              className={`h-5 w-5 rounded-full border`}
              style={{ backgroundColor: order?.color }}
            ></div>
          </div>
          <p className="text-sm text-lightContent">الحجم: {order?.size}</p>
          <p className="text-sm text-lightContent">الكمية: {order?.quntity}</p>
          <p className="text-sm text-lightContent">السعر: {order?.price}</p>
        </div>
      </div>
    </div>
  );
}
