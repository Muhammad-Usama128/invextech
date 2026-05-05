"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";

const PhoneNumberPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();
  let timer = null;

  useEffect(() => {
    if (localStorage.getItem("login")) {
      router.push("/");
    }
  }, [router]);

  const handleSendOtp = () => {
    if (phoneNumber.length === 0) {
      document.querySelector("#Error div p").innerText =
        "Enter Your Phone Number";
      document.querySelector("#Error").classList.add("!top-2");
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        document.querySelector("#Error").classList.remove("!top-2");
      }, 3000);
    } else if (phoneNumber.length !== 10) {
      document.querySelector("#Error div p").innerText = "Number is incorrect";
      document.querySelector("#Error").classList.add("!top-2");
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        document.querySelector("#Error").classList.remove("!top-2");
      }, 2000);
    } else {
      sessionStorage.setItem("number", phoneNumber);
      router.push(`/register/otp`);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div
        id="Error"
        className="py-5 px-2 absolute -top-full z-2 left-1/2 -translate-x-1/2 font-bold bg-red-500  rounded-lg transition-top duration-300"
      >
        <p
          onClick={() =>
            document.querySelector("#Error").classList.remove("!top-2")
          }
          className="text-sm absolute right-2 top-2 font-light cursor-pointer hover:font-bold"
        >
          X
        </p>
        <div className="relative flex justify-center items-center gap-2 mr-7">
          <span className="h-6 w-6 text-red-500 flex justify-center items-center rounded-full bg-white">
            !
          </span>
          <p className="text-white text-lg">Enter Your Phone Number</p>
        </div>
      </div>
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
            Enter Your Phone Number
          </h1>
          <p className="text-gray-400 mb-10 text-center">
            We will send you the code to confirm it.
          </p>

          <div className="w-full space-y-6">
            {/* Phone Input Box */}
            <div className="flex items-center gap-3">
              <div className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-4 text-gray-700 font-medium">
                +92
              </div>
              <input
                type="text"
                placeholder="301xxxxxxx"
                value={phoneNumber}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  if (val.length <= 10) {
                    setPhoneNumber(val);
                  }
                }}
                className="flex-1 bg-gray-50 border border-gray-100 rounded-lg px-4 py-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
              />
            </div>

            <button
              onClick={handleSendOtp}
              className="flex items-center justify-center gap-3 w-full bg-[#FFD700] hover:bg-[#F0C800] text-black font-bold py-4 px-4 rounded-lg transition-colors cursor-pointer"
            >
              <MessageSquare size={20} />
              SEND OTP
            </button>
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

export default PhoneNumberPage;
