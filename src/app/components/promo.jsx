'use client'
import React, { useState } from 'react'
import { Button, IconButton, Input} from './import'
import {GiPerspectiveDiceSixFacesOne} from 'react-icons/gi'
export default function Promo() {
    const [promoCode, setPromoCode] = useState("");

		const generatePromoCode = () => {
			// List of words for the promo code
			const words = [
				"SALE",
				"DISCOUNT",
				"SUMMER",
				"SAVE",
				"BARGAIN",
				"DEAL",
				"FALL",
				"WINTER",
				"SPRING",
				"HOLIDAY",
				"SPECIAL",
				"OFFER",
				"CLEARANCE",
				"FREE",
				"SHIP",
				"GIFT",
				"JULY",
				"HALLOWEEN",
			];

			const randomWord = words[Math.floor(Math.random() * words.length)];

			const randomNumber = Math.floor(Math.random() * 90) + 10;

			const code = randomWord + randomNumber.toString();

			setPromoCode(code);
		};
    const handlechange = (e) => {
      setPromoCode(e.target.value);
      console.log(e.target.value);
      
    
    };
  return (
		<div className="w-fit flex flex-col justify-center items-center gap-4">
			<Input label="promocode " value={promoCode} onChange={handlechange} />
			<div className="flex flex-row justify-between items-center gap-4">
				<IconButton
					size="lg"
					color="cyan"
					className="w-24 h-10 rounded-lg"
					onClick={generatePromoCode}
				>
					<GiPerspectiveDiceSixFacesOne className="h-8 w-8" />
				</IconButton>
				<Button className="font-Hacen-Tunisia"> ارسل</Button>
			</div>
		</div>
	);
}
