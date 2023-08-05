import "./globals.css";
import StoreProvider from "./redux/provider";

export const metadata = {
  title: "fri7a admin board",
  description: "admin dashboard for fri7a clothes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
