"use client";
function SwiperLoadingComponent() {
  const nItems = 10;
  const content = () => {
    return (
      <div className="flex flex-nowrap gap-3 overflow-auto md:overflow-hidden">
        {[...Array(nItems)].map((e, i) => (
          <div
            key={i}
            role="status"
            className="relative animate-pulse space-y-8 p-0 md:flex md:items-center md:space-x-8 md:space-y-0"
          >
            <div className="m-0 flex h-72 max-h-none w-52 max-w-none items-center justify-center  rounded-lg bg-gray-700 px-4 md:h-80 md:w-60">
              <svg
                className="h-12 w-12 text-gray-700"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 384 512"
              >
                <path d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z" />
              </svg>

              <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-4">
                <div className="h-4 w-16 rounded-full bg-gray-300"></div>
                <div className="h-2 w-10 rounded-full bg-gray-300"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  return content();
}
export default function SwiperLoading() {
  return <SwiperLoadingComponent />;
}
