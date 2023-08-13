"use client";
import { useEffect, useState } from "react";
import React from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Button,
  Input,
} from "@material-tailwind/react";
import { BellIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import ComplexNavbar from "./materialNavBar";
export default function Navbar2() {
  const [positionScroll, setPositinScroll] = useState(
    globalThis.window?.scrollY
  );
  const [headerPosition, setHeaderPosition] = useState("");
  useEffect(() => {
    const handlePosition = () => {
      if (positionScroll < globalThis.window?.scrollY) {
        setHeaderPosition("-translate-y-full");
      } else {
        setHeaderPosition("");
      }
      setPositinScroll(globalThis.window.scrollY);
    };
    window.addEventListener("scroll", handlePosition);
    return () => window.removeEventListener("scroll", () => {});
  }, [positionScroll]);
  return (
    <>
      <div className={`w-full py-3 ${headerPosition} duration-500`}>
        <ComplexNavbar />
      </div>
    </>
  );
}
