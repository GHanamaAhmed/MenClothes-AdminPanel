import React, { useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
} from "@material-tailwind/react";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
  ShoppingBagIcon,
  InboxIcon,
  PlusCircleIcon,
  CameraIcon,
} from "@heroicons/react/24/outline";
import { PresentationChartBarIcon } from "@heroicons/react/24/outline";
import { RiCoupon3Line } from "react-icons/ri";
import { usePathname, useRouter } from "next/navigation";
import { Axios } from "../../../lib/axios";
import InfoDialog from "./infoDialog";
// profile menu component
const profileMenuItems = [
  {
    label: "المعلومات",
    icon: InboxIcon,
  },
  {
    label: "تسجيل الخروج",
    icon: PowerIcon,
  },
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [photo, setPhoto] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const router = useRouter();
  useEffect(() => {
    Axios.get("/users/getInfo")
      .then((res) => {
        console.log(res.data);
        setPhoto(res.data?.Photo);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  const closeMenu = () => setIsMenuOpen(false);
  return (
    <>
      {!isLoading && (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
          <MenuHandler>
            <Button
              variant="text"
              color="blue-gray"
              className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
            >
              <Avatar
                variant="circular"
                size="sm"
                alt="tania andrew"
                className="border border-gray-900 p-0.5"
                crossOrigin="anonymous"
                src={photo}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`h-3 w-3 transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </Button>
          </MenuHandler>
          <MenuList className="p-1">
            {profileMenuItems.map(({ label, icon }, key) => {
              const isLastItem = key === profileMenuItems.length - 1;
              return label == "المعلومات" ? (
                <InfoDialog>
                  <MenuItem
                    key={label}
                    className={`flex items-center gap-2 rounded ${
                      isLastItem
                        ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                        : ""
                    }`}
                  >
                    {React.createElement(icon, {
                      className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                      strokeWidth: 2,
                    })}

                    <Typography
                      as="span"
                      variant="small"
                      className="font-normal"
                      color={isLastItem ? "red" : "inherit"}
                    >
                      {label}
                    </Typography>
                  </MenuItem>
                </InfoDialog>
              ) : (
                <MenuItem
                  key={label}
                  onClick={() => {
                    if (label == "تسجيل الخروج") {
                      Axios.get("/auth")
                        .then((res) => {
                          router.replace("/");
                        })
                        .catch((err) => {
                          console.error(err);
                        });
                    }
                    closeMenu();
                  }}
                  className={`flex items-center gap-2 rounded ${
                    isLastItem
                      ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                      : ""
                  }`}
                >
                  {React.createElement(icon, {
                    className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                    strokeWidth: 2,
                  })}

                  <Typography
                    as="span"
                    variant="small"
                    className="font-normal"
                    color={isLastItem ? "red" : "inherit"}
                  >
                    {label}
                  </Typography>
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
      )}
    </>
  );
}
// nav list component
const navListItems = [
  {
    label: "لوحة تحكم",
    icon: PresentationChartBarIcon,
    link: "/dashboard",
  },
  {
    label: "الموقع",
    icon: ShoppingBagIcon,
    link: "/",
  },
  {
    label: "الطلبيات",
    icon: InboxIcon,
    link: "/orders",
  },
  {
    label: "المنتجات",
    icon: PlusCircleIcon,
    link: "/products",
  },
  {
    label: "ريلز",
    icon: CameraIcon,
    link: "/reels",
  },
  {
    label: "تخفيضات",
    icon: RiCoupon3Line,
    link: "/promo",
  },
];

function NavList() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {navListItems.map(({ label, icon, link }, key) => (
        <Typography
          key={label}
          as="div"
          variant="small"
          color="blue-gray"
          className={`font-Hacen Tunisia`}
          onClick={() => {
            router.push(link);
          }}
        >
          <MenuItem
            className={`flex items-center gap-2 lg:rounded-full  ${
              link == pathname ? "bg-blue-gray-50 bg-opacity-80" : ""
            }`}
          >
            {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
            {label}
          </MenuItem>
        </Typography>
      ))}
    </ul>
  );
}

export default function ComplexNavbar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <Navbar className="w-full">
      <div className="relative mx-auto flex items-center text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium font-Hacen Tunisia"
        >
          Material Tailwind
        </Typography>
        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
        <ProfileMenu />
      </div>
      <MobileNav open={isNavOpen} className="overflow-scroll">
        <NavList />
      </MobileNav>
    </Navbar>
  );
}
