import React from 'react'
import {
	CardBody,
	CardFooter,
	CardHeader,
	Typography,
	Card,
} from '../components/import';

export default function CiCard({
	color,
	icon,
	title,
	value,
	footer,
	footercolor,
	footervalue,
}) {
	return (
		<Card className=''>
			<CardHeader
				className={` absolute -mt-4 grid h-16 w-16 place-items-center ${color}`}
			>
				{icon}
			</CardHeader>
			<CardBody className=" p-8 text-right ">
				<Typography variant="small" className="font-normal  text-blue-gray-600">
					{title}
				</Typography>
				<Typography variant="h4" color="blue-gray">
					{value}
				</Typography>
			</CardBody>
			{footer && (
				<CardFooter className="border-t border-blue-gray-50 p-4">
					<Typography className="font-normal text-blue-gray-600">
						<strong className={footercolor}>{footervalue}</strong>
						&nbsp;{footer}
					</Typography>
				</CardFooter>
			)}
		</Card>
	);
}
