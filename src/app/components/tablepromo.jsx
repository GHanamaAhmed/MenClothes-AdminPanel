"use client";
import { MagnifyingGlassIcon, TrashIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
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
    Avatar
} from "./import";
import { useEffect, useState } from "react";

export default function CiPromoTable({
	TABS,
	TABLE_HEAD,
	TABLE_ROWS,
	Header,
	subheader,
}) {
	return (
		<Card className="h-full  md:w-fit lg:w-full shadow-xl text-right">
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
							({  Promocode ,percentage,used ,createDate, useDate }, index) => {
								const isLast = index === TABLE_ROWS.length - 1;
								const classes = isLast
									? "p-4"
									: "p-4 border-b border-blue-gray-50";

								return (
									<tr key={Promocode}>
										<td className={classes}>
											<div className="flex items-center gap-3">
												<div className="hidden flex-col  md:flex">
													<Typography
														variant="small"
														color=""
														className="font-normal"
													>
														{Promocode}
													</Typography>
													<Typography
														variant="small"
														color="blue-gray"
														className="font-normal opacity-70"
													>
														{percentage}
													</Typography>
												</div>
											</div>
										</td>
										<td className={classes}>
											<div className="w-max">
												<Chip
													variant="ghost"
													size="sm"
													value={used ? "used" : "unused"}
													color={used ? "grey" : "blue"}
												/>
											</div>
										</td>
										<td className={classes}>
											<Typography
												variant="small"
												color="blue-gray"
												className="font-normal"
											>
												{createDate}
											</Typography>
										</td>

										<td className={classes}>
											<Typography
												variant="small"
												color="blue-gray"
												className="font-normal"
											>
												{useDate}
											</Typography>
										</td>
										<td className={classes}>
                                            <TrashIcon className="h-5 w-5 text-red-500" />
										</td>
									</tr>
								);
							}
						)}
					</tbody>
				</table>
			</CardBody>
			<CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
				<Typography variant="small" color="blue-gray" className="font-normal">
					Page 1 of 10
				</Typography>
				<div className="flex gap-2">
					<Button variant="outlined" color="blue-gray" size="sm">
						Previous
					</Button>
					<Button variant="outlined" color="blue-gray" size="sm">
						Next
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
}
