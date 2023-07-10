import "./globals.css";


export const metadata = {
	title: "fri7a admin board",
	description: "admin dashboard for fri7a clothes",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className="">

					{children}
			</body>
		</html>
	);
}
