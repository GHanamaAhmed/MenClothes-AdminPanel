import Navbar from "../components/navbar";
import SpeedyDial from "../components/speedDial";
import ToastProvider from "../components/toastProvider";
export default function RootLayout({ children }) {
  return (
    <div className="flex flex-row h-fit md:h-full justify-start gap-2 z-0 bg-blue-gray-50 scroll-my-0">
      <Navbar />
      <ToastProvider>{children}</ToastProvider>
    </div>
  );
}
