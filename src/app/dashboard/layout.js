import Navbar from "../components/navbar";
export default function RootLayout({ children }) {
	return (
		<div className="flex flex-row h-fit w-fit md:w-full justify-start gap-2 z-0 bg-blue-gray-50 scroll-my-0">

			<Navbar />
			{children}
		</div>
	);
}
