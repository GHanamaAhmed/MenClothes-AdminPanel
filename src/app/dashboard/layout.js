import Navbar from "../components/navbar";
import SpeedyDial from "../components/speedDial";
export default function RootLayout({ children }) {
	return (
		<div className="flex flex-row h-screen justify-start gap-2 z-0">
			<SpeedyDial/>
			<Navbar />
			{children}
		</div>
	);
}
