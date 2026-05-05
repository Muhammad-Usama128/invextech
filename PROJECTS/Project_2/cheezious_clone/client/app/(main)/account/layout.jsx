"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AccountLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const loginData = localStorage.getItem("login");
    if (!loginData) {
      router.push("/");
    }
  }, [router]);

  if (!mounted) return null;

  const tabs = [
    { name: "EDIT PROFILE", path: "/account/edit-profile" },
    { name: "ORDER HISTORY", path: "/account/order-history" },
    { name: "FAVOURITES", path: "/account/favorites" },
  ];

  return (
    <div className="min-h-screen bg-white text-black font-sans pt-4 pb-4 px-4 md:px-8 lg:px-24">
      <h1 className="text-[34px] font-extrabold mb-10 tracking-tight">
        My Account
      </h1>

      <div className="flex w-full border-b border-gray-200 mb-8">
        {tabs.map((tab) => {
          const isActive =
            pathname === tab.path || pathname.startsWith(tab.path);
          return (
            <Link key={tab.path} href={tab.path} className="flex-1">
              <div
                className={`pb-4 text-[13px] tracking-wide font-bold text-center cursor-pointer transition-colors border-b-2 ${
                  isActive
                    ? "text-black border-black"
                    : "text-gray-500 border-transparent hover:text-black"
                }`}
              >
                {tab.name}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="pb-10">{children}</div>
    </div>
  );
}
