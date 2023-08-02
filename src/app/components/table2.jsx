"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
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
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
	Select,
	Option,
	Menu,
	MenuHandler,
	MenuList,
	MenuItem,
} from "./import";
import { useState } from "react";

export default function CiTable2({ TABS, TABLE_HEAD, TABLE_ROWS }) {
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(!open);

	return (
		<Card className="h-full  md:w-fit lg:w-full shadow-lg text-right ">
			<CardHeader floated={false} shadow={false} className="rounded-none">
				<div className="mb-8 flex items-center justify-between gap-8">
					<div>
						<Typography
							variant="h5"
							color="blue-gray"
							className="font-Hacen-Tunisia"
						>
							المستخدمين الاوفياء
						</Typography>
						<Typography color="gray" className="mt-1 font-Hacen-Tunisia">
							عرض معلومات حول هؤلاء المستخدمين
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
					<div className="w-full md:w-60 ">
						<Input label="بحث" />
					</div>
				</div>
			</CardHeader>
			<CardBody className="overflow-scroll px-0 text-right">
				<table className="mt-4 w-full min-w-max table-auto  text-right">
					<thead>
						<tr>
							{TABLE_HEAD.map((head) => (
								<th
									key={head}
									className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
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
							({ img, name, email, items, paid, order, date }, index) => {
								const isLast = index === TABLE_ROWS.length - 1;
								const classes = isLast
									? "p-4"
									: "p-4 border-b border-blue-gray-50";

								return (
									<tr key={name}>
										<td className={classes}>
											<div className="flex items-center gap-3">
												<Avatar
													src={img}
													alt={name}
													size="sm"
													className="z-10"
												/>
												<div className="hidden flex-col  md:flex">
													<Typography
														variant="small"
														color="blue-gray"
														className="font-Hacen-Tunisia"
													>
														{name}
													</Typography>
													<Typography
														variant="small"
														color="blue-gray"
														className="font-Hacen-Tunisia opacity-70"
													>
														{email}
													</Typography>
												</div>
											</div>
										</td>
										<td className={classes}>
											<div className="flex flex-col">
												<Typography
													variant="small"
													color="blue-gray"
													className="font-Hacen-Tunisia"
												>
													{items}
												</Typography>
												<Typography
													variant="small"
													color="blue-gray"
													className="font-Hacen-Tunisia opacity-70"
												>
													{paid}
												</Typography>
											</div>
										</td>
										<td className={classes}>
											<div className="w-max">
												<Button
													onClick={handleOpen}
													variant="gradient"
													className="font-Hacen-Tunisia"
												>
													الطلبية
												</Button>
												<Dialog
													open={open}
													handler={handleOpen}
													dismiss={{ enabled: false }}
													className="font-Hacen-Tunisia"
												>
													<DialogHeader className="font-Hacen-Tunisia">
														الطلبية
													</DialogHeader>
													<DialogBody divider>{order}</DialogBody>
													<DialogFooter className="flx flex-row gap-2">
														<Button
															variant="text"
															color="red"
															className="mr-1"
															onClick={handleOpen}
														>
															<span>اغلاق</span>
														</Button>
														<div className="flex ">
															<Select tabIndex="1">
																<div className="group bg-red-600 rounded-lg mb-1">
																	<Option
																		index={1}
																		className="bg-red-600 text-center   group-hover:bg-lightSolid transition-all"
																	>
																		<span className="text-white group-hover:text-black">
																			رفض الطلبية
																		</span>
																	</Option>
																</div>
																<div className="group bg-green-600 rounded-lg mb-1">
																	<Option
																		index={2}
																		className="bg-green-600  text-center  group-hover:bg-lightSolid transition-all"
																	>
																		<span className="text-white group-hover:text-black">
																			قبول الطلبية
																		</span>
																	</Option>
																</div>
																<div className="group hover:opacity-100 transition-all opacity-60 rounded-lg mb-1">
																	<Option
																		index={3}
																		
																		className="bg-blue-600  text-center  group-hover:bg-lightSolid transition-all"
																	>
																		<span className="text-white group-hover:text-black">
																			اتمام الطلبية
																		</span>
																	</Option>
																</div>
																<div className="group opacity-60 hover:opacity-100 transition-all rounded-lg mb-1">
																	<Option
																		index={4}
																		className="bg-red-600  text-center  group-hover:bg-lightSolid transition-all"
																	>
																		<span className="text-white group-hover:text-black">
																			الغاء الطلبية
																		</span>
																	</Option>
																</div>
															</Select>
														</div>
													</DialogFooter>
												</Dialog>
											</div>
										</td>
										<td className={classes}>
											<Typography
												variant="small"
												color="blue-gray"
												className="font-Hacen-Tunisia"
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
			<CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
				<Typography
					variant="small"
					color="blue-gray"
					className="font-Hacen-Tunisia"
				>
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
