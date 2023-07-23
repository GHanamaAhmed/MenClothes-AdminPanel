"use client";
import React, { useState } from "react";
import * as x from "./import";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import AddINput from "./addINput";
export default function AddProduct() {
	const [y, sety] = useState(1);
	const addtoy = () => {
		sety(y + 1);
	};
	const [Details, SetDetails] = useState([<AddINput num={y} />]);
	const [open, setOpen] = useState(false);
	const toggleOpen = () => {
		setOpen(!open);
	};
	const addDetails = () => {
		SetDetails([...Details, <AddINput num={y + 1} />]);
		addtoy();
	};
	const remDetails = () => {
		Details.pop();
		SetDetails(Details);
		if (y >= 1) {
			sety(y - 1);
		}
	};
	return (
		<x.Card className="mx-auto  max-w-none w-fit my-2 overflow-y-scroll max-h-[30rem] shadow-none">
			<x.CardBody className="flex flex-col gap-4 justify-evenly items-center ">
				<div className="flex flex-row gap-4 justify-evenly items-center">
					<x.Input label="الاسم" size="lg" name="name" />
					<x.Input label="النوع" size="lg" name="type" />
					<x.Input label="السعر" size="lg" name="price" />
					<x.Input label="الوصف" size="lg" name="description" />
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
							{Details.map((detail, i) => (
								<div key={i}>{detail}</div>
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
									onClick={addDetails}
									variant=""
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
