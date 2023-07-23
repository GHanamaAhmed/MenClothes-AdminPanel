'use client'
import React from 'react'
import * as x from './import'
export default function AddINput({num}) {
  return (
		<div className="flex flex-row gap-2 justify-center items-center">
			<p>- {num} -</p>
			<x.Input label="لون" type="text"></x.Input>
			<label
				htmlFor="image"
				className="m-2 bg-scandaryColor  text-white rounded-lg px-4 py-2 cursor-pointer hover:opacity-50 transition-all ease-in-out  font-Hacen-Tunisia"
			>
			 صور
			</label>
			<input type="file" className="hidden" name="image" id="image" />
			<x.Input label="احجام" type="text"></x.Input>
			<x.Input label="كمية" type="text"></x.Input>
		</div>
	);
}
