import Navbar from "../components/navbar";
import SpeedyDial from "../components/speedDial";
export default function RootLayout({ children }) {
	return (
		<div className="flex flex-row h-full md:h-full justify-start gap-2 z-0 bg-blue-gray-50 scroll-my-0">
			<Navbar />
			{children}
		</div>
	);
}
