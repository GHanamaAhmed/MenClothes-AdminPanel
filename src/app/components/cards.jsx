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
		<Card className="font-Hacen-Tunisia">
			<CardHeader
				className={` font-Hacen-Tunisia absolute -mt-4 grid h-16 w-16 place-items-center ${color}`}
			>
				{icon}
			</CardHeader>
			<CardBody className=" font-Hacen-Tunisia p-8 text-left ">
				<Typography
					variant="small"
					className=" font-Hacen-Tunisia text-blue-gray-600"
				>
					{title}
				</Typography>
				<Typography variant="h4" color="blue-gray">
					{value}
				</Typography>
			</CardBody>
			{footer && (
				<CardFooter className="border-t border-blue-gray-50 p-4 font-Hacen-Tunisia">
					<Typography className="font-Hacen-Tunisia text-blue-gray-600 text-right">
						{footer}&nbsp;
						<strong className={footercolor }>{footervalue}</strong>
					</Typography>
				</CardFooter>
			)}
		</Card>
	);
}
