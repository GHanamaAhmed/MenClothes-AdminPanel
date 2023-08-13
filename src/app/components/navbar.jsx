"use client";
import { useEffect, useState } from "react";
import React from "react";
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
      <div className={`w-full py-3 z-50 fixed ${headerPosition} duration-500`}>
        <ComplexNavbar />
      </div>
    </>
  );
}
