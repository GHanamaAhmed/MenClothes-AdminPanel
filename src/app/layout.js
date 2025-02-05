import ToastProvider from "./components/toastProvider";
import "./globals.css";
import StoreProvider from "./redux/provider";

export const metadata = {
  title: "fri7a Dashboard",
  description: "admin dashboard for fri7a clothes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <ToastProvider>{children}</ToastProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
