"use client";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import {
	PencilIcon,
	PencilSquareIcon,
	UserPlusIcon,
} from "@heroicons/react/24/solid";
import {
	Card,
	CardHeader,
	Input,
	Typography,
	Button,
	CardBody,
	Chip,
	CardFooter,
	Tabs,
	TabsHeader,
	Tab,
	Avatar,
	IconButton,
	Tooltip,
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
} from "./import";
import { useEffect, useState } from "react";
import Link from "next/link";
import AddProduct from "./addProduct";
import Edit from "./edit";

export default function ProductTable({
	TABS,
	TABLE_HEAD,
	TABLE_ROWS,
	Header,
	subheader,
}) {
	const [open, setOpen] = useState(false);

	const handleOpen = () => {setOpen(!open);return}
	const [open2, setOpen2] = useState(false);

	const handleOpen2 = () => setOpen2(!open2);
	return (
		<Card className="h-full  md:w-fit lg:w-full shadow-lg text-right">
			<CardHeader floated={false} shadow={false} className="rounded-none">
				<div className="mb-8 flex items-center justify-between gap-8">
					<div>
						<Typography
							variant="h5"
							color="blue-gray"
							className="font-Hacen-Tunisia"
						>
							{Header}{" "}
						</Typography>
						<Typography color="gray" className="mt-1 font-Hacen-Tunisia">
							{subheader}
						</Typography>
					</div>
					<div className="flex shrink-0 flex-col gap-2 sm:flex-row">
						<Button
							variant="outlined"
							color="blue-gray"
							size="sm"
							className="font-Hacen-Tunisia"
						>
							عرض الكل
						</Button>
					</div>
				</div>
				<div className="flex flex-col items-center justify-between gap-4 md:flex-row">
					<Tabs value="all" className="w-full md:w-max">
						<TabsHeader>
							{TABS.map(({ label, value }) => (
								<Tab key={value} value={value}>
									&nbsp;&nbsp;{label}&nbsp;&nbsp;
								</Tab>
							))}
						</TabsHeader>
					</Tabs>
					<div className="w-full md:w-60 flex flex-row justify-evenly items-center">
						<MagnifyingGlassIcon className="h-5 w-5  " />
						<Input className="gap-1" label="بحث" />
					</div>
				</div>
			</CardHeader>
			<CardBody className="overflow-scroll px-0">
				<table className="mt-4 w-full min-w-max table-auto text-right font-Hacen-Tunisia">
					<thead>
						<tr className="font-Hacen-Tunisia">
							{TABLE_HEAD.map((head) => (
								<th
									key={head}
									className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 "
								>
									<Typography
										variant="small"
										color="blue-gray"
										className="font-Hacen-Tunisia leading-none opacity-70"
									>
										{head}
									</Typography>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{TABLE_ROWS.map(
							(
								{ img, name, price, stock, type, reel, reelid, date },
								index
							) => {
								const isLast = index === TABLE_ROWS.length - 1;
								const classes = isLast
									? "p-4"
									: "p-4 border-b border-blue-gray-50";

								return (
									<tr key={name}>
										<td className={classes} onClick={handleOpen}>
											<div className="flex items-center gap-3">
												<Avatar
													src={img}
													alt={name + "&nbsp;" + price}
													size="xl"
													variant="rounded"
												/>
												<div className="hidden flex-col  md:flex">
													<Typography
														variant="small"
														color="blue-gray"
														className="font-Hacen-Tunisia hidden  md:flex"
													>
														{name}
													</Typography>
													<Typography
														variant="small"
														color="blue-gray"
														className="font-Hacen-Tunisia  opacity-70"
													>
														{price}
													</Typography>
												</div>
											</div>
										</td>
										<td className={classes}>
											<div className="flex flex-col">
												<Typography
													variant="small"
													color="blue-gray"
													className="font-Hacen-Tunisia "
												>
													{stock}
												</Typography>
												<Typography
													variant="small"
													color="blue-gray"
													className="font-Hacen-Tunisia  opacity-70"
												>
													{type}
												</Typography>
											</div>
										</td>
										<td className={classes}>
											<div className="w-max">
												<Link href={reel}> {reelid}</Link>
											</div>
										</td>
										<td className={classes}>
											<Typography
												variant="small"
												color="blue-gray"
												className="font-Hacen-Tunisia "
											>
												{date}
											</Typography>
										</td>
									</tr>
								);
							}
						)}
					</tbody>
				</table>
			</CardBody>
			<CardFooter className="flex items-center justify-center gap-4 md:justify-between border-t border-blue-gray-50 p-4">
				<Typography
					variant="small"
					color="blue-gray"
					className="font-Hacen-Tunisia "
				>
					1/10
				</Typography>
				<div className="flex gap-1">
					<Button variant="outlined" color="blue-gray" size="sm">
						{"<"}
					</Button>
					<Button variant="outlined" color="blue-gray" size="sm">
						{">"}
					</Button>
				</div>
				<Button onClick={handleOpen2} variant="gradient" color="cyan" size="sm">
					<PlusIcon className="h-5 w-5"></PlusIcon>
				</Button>
				<Dialog
					open={open2}
					handler={handleOpen2}
					className="w-full h-fit"
					size="xl"
				>
					<DialogHeader className="flex items-center justify-center gap-4 font-Hacen-Tunisia">
						{" "}
						اضافة منتج{" "}
					</DialogHeader>

					<DialogBody
						divider
						className="flex flex-col items-center justify-center gap-4"
					>
						<AddProduct />
					</DialogBody>
					<DialogFooter className="flex items-center justify-end gap-4">
						<Button
							variant="text"
							color="red"
							onClick={handleOpen2}
							className="mr-1"
						>
							<span>اغلاق</span>
						</Button>

						<Button
							variant="gradient"
							color="blue"
							onClick={() => {handleOpen2();handleOpen();}}
							className="mr-1"
						>
							<span>عرض المنتج</span>
						</Button>
						<Button
							variant="gradient"
							color="cyan"
							onClick={handleOpen2}
							className="mr-1"
						>
							<span>اضف</span>
						</Button>
					</DialogFooter>
				</Dialog>
			</CardFooter>
			<Dialog open={open} handler={handleOpen}>
				<DialogHeader>Product</DialogHeader>
				<DialogBody divider> <Edit></Edit></DialogBody>
				<DialogFooter className="flex items-center justify-end gap-4">
					<Button
						variant="text"
						color="red"
						onClick={handleOpen}
						className="mr-1"
					>
						<span>اغلاق</span>
					</Button>
					<Button variant="gradient" color="cyan" onClick={handleOpen}>
						<span>تعديل</span>
					</Button>
				</DialogFooter>
			</Dialog>
		</Card>
	);
}
