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
import { Textarea } from "@material-tailwind/react";
import Gallary from "./gallary";
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
export default function Edit() {
  const [selectedColor, setSelectedColor] = useState(products[0].color);
  const [quantityValue, setQuantityValue] = useState();
  const [selectedsize, setSelectedsize] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const handleColorChange = (e) => {
    setSelectedColor(e);
    setQuantityValue(
      products[products.findIndex((el) => el.color == e)].quantity
    );
  };
  useEffect(() => {

  });
  const handleSizeChange = (e) => {
    setSelectedsize(e);
  };
  const handleImageChange = (e) => {
    setSelectedImage(e.target.value);
  };
  const handleQuantityChange = (e) => {
    setQuantityValue(e.target.value);
  };

  return (
		<div className="flex flex-col w-full items-center justify-evenly gap-4">
			<div className="md:grid-cols-3 grid-cols-1 grid w-full gap-4 pt-2 font-Hacen-Tunisia">
				<Input
					label="الاسم"
					size="md"
					name="name"
					className="font-Hacen-Tunisia w-full"
				/>
				<Input
					label="النوع"
					size="md"
					name="type"
					className="font-Hacen-Tunisia w-full"
				/>
				<div className="">
					<Input
						label="السعر"
						size="md"
						name="price"
						className="font-Hacen-Tunisia w-full"
					/>
				</div>
				<div className="md:col-span-3">
					{" "}
					<Textarea
						label="الوصف"
						size="md"
						name="description"
						className="text-justify font-Hacen-Tunisia w-full"
					/>
				</div>
			</div>
			<Gallary
				images={
					products[products.findIndex((e) => e.color == selectedColor)]?.photos
				}
			/>
			<div className="md:grid-cols-3 grid-cols-1 grid w-full gap-4 pt-2 font-Hacen-Tunisia">
				<Select
					variant="outlined"
					size="md"
					label="اللون"
					labelProps={{ className: "font-Hacen-Tunisia -mx-4 " }}
					onChange={handleColorChange}
				>
					{products.map((e) => (
						<Option key={e.color} value={e.color}>
							{e.color}
						</Option>
					))}
				</Select>
				<Select
					variant="outlined"
					size="md"
					label="الحجم"
					labelProps={{ className: "font-Hacen-Tunisia -mx-4 " }}
					onChange={handleSizeChange}
				>
					{products[
						products.findIndex((e) => e.color == selectedColor)
					]?.sizes.map((size) => (
						<Option key={size} value={size}>
							{size}
						</Option>
					))}
				</Select>
				<Input
					type="text"
					label="الكمية"
					inputMode="numeric"
					value={quantityValue}
					onChange={handleQuantityChange}
				/>
			</div>
		</div>
	);
}
