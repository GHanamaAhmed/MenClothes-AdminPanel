"use client";
import Link from "next/link";
import { Collapse } from "./import";
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Checkbox,
	Input,
	Typography,
} from "./import";
import React, { useState } from "react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import Shorty from "./short2";

export default function Reels2({tit ,subtit ,like ,comm ,views}) {
	const [open, setOpen] = useState(false);
	const toggleOpen = () => setOpen((cur) => !cur);
	const [title, setTitle] = useState(tit);
	const handleTitle = (e) => {
		setTitle(e.target.value);
	};
	const [subtitle, setSubtitle] = useState(subtit);
	const handleSubtitle = (e2) => {
		setSubtitle(e2.target.value);
	};
	return (
		<>
			<div className="flex flex-row items-center  justify-center p-2 md:w-fit">
				<Card className="h-5/6 w-fit max-w-2/3 bg-white shadow-lg rounded-lg p-2">
					<CardBody className="h-5/6 flex flex-row items-center justify-center gap-2">
						<div className="flex flex-col items-center justify-center gap-2">
							<Input
								type="text"
								label="Reel name"
								size="md"
								color="teal"
								onChange={handleTitle}
							/>
							<Input
								type="text"
								label="description"
								size="md"
								color="teal"
								onChange={handleSubtitle}
							/>
							<Shorty
								title={title}
								subtitle={subtitle}
								likes={like}
								comments={comm}
								views={views}
							/>

							<div className="flex flex-col items-center justify-center gap-2">
								<Button onClick={toggleOpen} className="rounded-xl bg-card1">
									link product
								</Button>
								<div>
									<Card
										className={`flex transition-all flex-row items-center justify-center  md:w-fit ${
											open ? "" : "hidden"
										}`}
									>
										<CardBody className="w-fit flex flex-row items-center justify-center ">
											<Input
												type="text"
												label="link"
												color="teal"
												className="max-w-[200px]"
											/>
										</CardBody>
									</Card>
								</div>
							</div>
						</div>
					</CardBody>
				</Card>
			</div>
		</>
	);
}
