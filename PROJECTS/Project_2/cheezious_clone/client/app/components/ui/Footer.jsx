"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
const Footer = () => {
  const pathname = usePathname();
  return (
    <div
      className={`w-full bg-gray-100 py-7 mt-auto ${pathname === "/menu" && "hidden"} `}
    >
      <div className="flex justify-center items-center gap-3">
        <Image
          src="/Footer-Logo.png"
          width={0}
          height={0}
          sizes="100vw"
          className="w-6 h-auto"
          alt="Cheezious Logo"
        />
        <p className="font-thin text-gray-600">
          Cheezious Copyright © 2026. All Rights Reserved.
        </p>
      </div>
      <div className="flex gap-2 justify-center items-center mt-4">
        <Link href="#" className="text-xs font-medium">
          TERMS & CONDITIONS
        </Link>
        |
        <Link href="#" className="text-xs font-medium">
          PRIVACY POLICY
        </Link>
      </div>
    </div>
  );
};

export default Footer;
