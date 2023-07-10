import Navbar from "../components/navbar";
export default function RootLayout({ children }) {
	return (
		<div className="flex flex-row h-screen justify-start gap-2">
			<Navbar />
			{children}
		</div>
	);
}
