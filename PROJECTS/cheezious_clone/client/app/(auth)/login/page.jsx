"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, User } from "lucide-react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("login")) {
      router.push("/");
    }
  }, [router]);

  return (
    <div className="flex min-h-screen">
      {/* Left side content */}
      <div className="flex-1 flex flex-col relative px-8 py-6 max-w-full">
        {/* Logo */}
        <Link href="/" className="inline-block w-fit">
          <Image
            src="/cheezious-logo.png"
            alt="Cheezious Logo"
            width={150}
            height={50}
            className="w-40 h-auto"
          />
        </Link>

        {/* Main Form Area */}
        <div className="flex-1 flex flex-col justify-center items-center max-w-md mx-auto w-full">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            Hey there, feeling hungry?
          </h1>
          <p className="text-gray-400 mb-10 text-center">
            Let's enjoy your food with cheezious!
          </p>

          <div className="w-full space-y-4">
            <Link
              href="/login/phone-number"
              className="flex items-center justify-center gap-3 w-full bg-[#FFD700] hover:bg-gray-400 text-black font-bold py-4 px-4 rounded-lg transition-colors"
            >
              <Phone size={20} />
              CONTINUE WITH PHONE
            </Link>

            <Link
              href="/"
              className="flex items-center justify-center gap-3 w-full bg-white border border-gray-400 hover:bg-orange-500 text-gray-800 font-bold py-4 px-4 rounded-lg transition-colors"
            >
              <User size={20} />
              CONTINUE AS A GUEST
            </Link>
          </div>
        </div>
      </div>

      {/* Right side image - hidden below 1124px */}
      <div className="hidden min-[1124px]:block w-[50%] relative">
        <Image
          src="/DeliveryMan.jpg"
          alt="Cheezious Delivery"
          fill
          className="object-cover object-center"
          priority
        />
      </div>
    </div>
  );
};

export default LoginPage;
