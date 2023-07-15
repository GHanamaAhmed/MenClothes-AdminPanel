'use client'
import Link from 'next/link';
import { Collapse } from './import';
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
import React, { useState } from 'react'
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid';
import Shorty from './short2';

export default function Reels() {
      const [open, setOpen] = useState(false);
			const toggleOpen = () => setOpen((cur) => !cur);
  return (
		<>
			<div className="flex flex-row items-center  justify-center p-2 md:w-fit">
				<Card className=" w-fit max-w-2/3 bg-white shadow-lg rounded-lg p-4">
					<CardHeader className="mb-4 grid h-28 place-items-center bg-card1">
						<Typography variant="h3" color="white">
							upload reel
						</Typography>
					</CardHeader>
					<CardBody className="flex flex-row items-center justify-center gap-2">
						<div className="flex flex-col items-center justify-center gap-2">
							<Input type="text" label="Reel name" size="md" color="teal" />
							<Input type="text" label="description" size="md" color="teal" />
							<Input type="file" label="video" size="md" color="teal" />
							<Shorty />

							<div className="flex flex-col items-center justify-center gap-2">
								<Button onClick={toggleOpen} className="rounded-xl bg-card1">
									link product
								</Button>
								<div>
									<Card
										className={`flex transition-all flex-row items-center justify-center  md:w-fit ${open ? "" : "hidden"}`}
									>
										<CardBody className="w-fit flex flex-row items-center justify-center ">
											<Input type="file" label="video" color="teal" className='max-w-[200px]' />
										</CardBody>
									</Card>
								</div>
							</div>
						</div>
					</CardBody>
					<CardFooter className="pt-0">
						<Button
							className="bg-scandaryColor shadow-scandaryColor hover:shadow-scandaryColor"
							fullWidth
						>
							<div className="flex justify-center">
								<ArrowUpTrayIcon className="h-8 w-8 text-white"></ArrowUpTrayIcon>
							</div>
						</Button>
					</CardFooter>
				</Card>
			</div>
		</>
	);
}
