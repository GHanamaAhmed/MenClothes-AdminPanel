"use client";
import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Input, Menu, MenuHandler, MenuItem, MenuList, Option, Select ,} from "./import";
import Gallary from "./gallary";

export default function Edit() {
	const images = {
		white: [
			"https://www.shutterstock.com/shutterstock/photos/1474887965/display_1500/stock-photo-white-t-shirts-mockup-front-and-back-used-as-design-template-1474887965.jpg",
		],
		black: [
			"https://as1.ftcdn.net/v2/jpg/02/70/26/92/1000_F_270269250_8d6GYDR1VDFlu0tjzC20uw8bVMCwJeFI.jpg",
		],
		blue: [
			"https://as2.ftcdn.net/v2/jpg/04/95/61/43/1000_F_495614379_I1OZEKXgYnw6dj3IGq6pezJxlNnuTUzo.jpg",
		],
		red: [
			"https://as1.ftcdn.net/v2/jpg/04/95/61/44/1000_F_495614430_fBwc1WsnTMpBG6sxRjy4UXzqopWyp2hQ.jpg",
		],
		yellow: [
			"https://as2.ftcdn.net/v2/jpg/05/78/91/33/1000_F_578913311_ObRfcIlsgFbcb79sFdsj5QqdeOM8FSdI.jpg",
		],
	};
	const quantity = {
		white: "15",
		black: "21",
		blue: "12",
		red: "9",
		yellow: "4",
	};
	const sizes = {
		white: ["S", "M", "XL"],
		black: ["S", "M", "L", "XL"],
		blue: ["M", "L", "XL"],
		red: ["S", "M", "L", "XL"],
		yellow: ["S", "M", "L"],
	};
 const colors = Object.keys(images);
  const [selectedColor, setSelectedColor] = useState(colors[0]); 
  const handleColorChange = (e) => {
	setSelectedColor(e)
	setQuantityValue(quantity[e])
	setSelectedImage(images[e][0])
	setSelectedsize(sizes[e][0])
  }
   ;
   const [selectedsize ,setSelectedsize] = useState(sizes[selectedColor][0]);
   const handleSizeChange = (e) => {
	setSelectedsize(e)
   }
   const [selectedImage, setSelectedImage] = useState(images[selectedColor][0]);
   const handleImageChange = (e) => {
	setSelectedImage(e)
   }
const [quantityValue, setQuantityValue] = useState(quantity[selectedColor]);
   const handleQuantityChange = (e) => {
	console.log(e.target.value);
	setQuantityValue(e.target.value)
   }

  return (
		<div className="flex flex-col items-center justify-center h-full w-full">
			<Card className="flex flex-col items-center justify-center h-full w-full overflow-hidden">
				<CardBody className="flex flex-row items-center justify-center  w-full overflow-hidden">
					<div>
						<div className="flex flex-col items-center justify-evenly gap-2">
							<div className="w-11/12 h-full flex flex-col items-center justify-evenly  ">
								<Gallary />
							</div>
							<div className="flex flex-row items-center justify-center gap-2">
								<Select
									variant="outlined"
									size="lg"
									label="Color"
									value={selectedColor}
									onChange={handleColorChange}
								>
									{colors.map((color) => (
										<Option key={color} value={color}>
											{color}
										</Option>
									))}
								</Select>
								<Select
									variant="outlined"
									size="lg"
									label="Size"
									value={sizes[selectedColor][0]}
									onChange={handleSizeChange}
								>
									{sizes[selectedColor] &&
										sizes[selectedColor].map((size) => (
											<Option key={size} value={size}>
												{size}
											</Option>
										))}
								</Select>
								<Input
									type="text"
									label="Quantity"
									inputMode="numeric"
									value={quantityValue}
									onChange={handleQuantityChange}
								/>
							</div>
						</div>
					</div>
				</CardBody>
			</Card>
			<div></div>
		</div>
	);
}







