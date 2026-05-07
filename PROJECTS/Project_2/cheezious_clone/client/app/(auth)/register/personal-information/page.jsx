"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

const PersonalInformationPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  let timer = null;
  useEffect(() => {
    // Redirect to main page if already logged in
    if (localStorage.getItem("login")) {
      router.push("/");
      return;
    }

    const storedNumber = sessionStorage.getItem("number");
    if (!storedNumber) {
      router.push("/");
    }
  }, [router]);

  const handleContinue = async () => {
    if (name.trim().length <= 3) {
      handleError("Name is small.");
      return;
    }
    // Proceed with registration or navigation
    console.log("Proceeding to home screen with name:", name);

    try {
      const rawNumber = sessionStorage.getItem("number") || "";
      let number = rawNumber;
      if (!number.startsWith("+92")) {
        number = "+92" + number;
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user`,
        {
          name,
          number,
        },
      );

      if (response.status === 200) {
        const userData = response.data;
        localStorage.setItem("login", JSON.stringify(userData));
        document.querySelector("#loginSuccess").classList.add("!top-2");
        setTimeout(() => {
          sessionStorage.removeItem("number");
          router.push("/");
        }, 2000);
      } else {
        handleError("Failed to register.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      handleError("Something went wrong.");
    }
  };

  const isButtonEnabled = termsAccepted && privacyAccepted;

  const handleError = (messgae) => {
    document.querySelector("#nameError div p").innerText = messgae;
    document.querySelector("#nameError").classList.add("!top-2");
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      document.querySelector("#nameError").classList.remove("!top-2");
    }, 2000);
  };

  return (
    <div className="flex min-h-screen">
      <div
        id="loginSuccess"
        className="py-5 px-2 absolute -top-full z-2 left-1/2 -translate-x-1/2 font-bold bg-green-500  rounded-lg transition-top duration-300"
      >
        <p
          onClick={() => {
            document.querySelector("#loginSuccess").classList.remove("!top-2");
            if (timer) {
              clearTimeout(timer);
            }
          }}
          className="text-sm absolute right-2 top-2 font-light cursor-pointer hover:font-bold"
        >
          X
        </p>
        <div className="relative flex justify-center items-center gap-2 mr-7">
          <span className="h-6 w-6 text-green-500 flex justify-center items-center rounded-full bg-white">
            ✓
          </span>
          <p className="text-white text-lg max-lg:text-base">
            Login Successfully
          </p>
        </div>
      </div>

      <div
        id="nameError"
        className="py-5 px-2 absolute -top-full z-2 left-1/2 -translate-x-1/2 font-bold bg-red-500  rounded-lg transition-top duration-300"
      >
        <p
          onClick={() =>
            document.querySelector("#nameError").classList.remove("!top-2")
          }
          className="text-sm absolute right-2 top-2 font-light cursor-pointer hover:font-bold"
        >
          X
        </p>
        <div className="relative flex justify-center items-center gap-2 mr-7">
          <span className="h-6 w-6 text-red-500 flex justify-center items-center rounded-full bg-white">
            !
          </span>
          <p className="text-white text-lg max-lg:text-base"></p>
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
            We Are Almost Done!
          </h1>
          <p className="text-gray-400 mb-10 text-center">
            Please enter your personal information
          </p>

          <div className="w-full space-y-6">
            {/* Name Input Box */}
            <div>
              <input
                type="text"
                placeholder="Enter Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
              />
            </div>

            {/* Checkboxes */}
            <div className="space-y-4 pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-[#FFD700] focus:ring-[#FFD700] cursor-pointer"
                />
                <span className="text-gray-500 text-sm leading-relaxed">
                  I accept the{" "}
                  <a
                    href="#"
                    className="font-bold underline text-gray-500 hover:text-gray-700"
                  >
                    Terms and conditions
                  </a>
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={privacyAccepted}
                  onChange={(e) => setPrivacyAccepted(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-[#FFD700] focus:ring-[#FFD700] cursor-pointer"
                />
                <span className="text-gray-500 text-sm leading-relaxed">
                  I accept the{" "}
                  <a
                    href="#"
                    className="font-bold underline text-gray-500 hover:text-gray-700"
                  >
                    Privacy notice and the information. Use policies and cookies
                    policy
                  </a>
                </span>
              </label>
            </div>

            <button
              onClick={handleContinue}
              disabled={!isButtonEnabled}
              className={`w-full font-bold py-4 px-4 rounded-lg transition-colors bg-[#FFD700] ${
                isButtonEnabled
                  ? "text-black cursor-pointer"
                  : " text-yellow-200 cursor-not-allowed"
              }`}
            >
              CONTINUE TO HOME SCREEN
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

export default PersonalInformationPage;
