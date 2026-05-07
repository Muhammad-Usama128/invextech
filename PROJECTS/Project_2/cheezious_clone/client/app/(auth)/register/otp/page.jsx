"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

const OtpContent = () => {
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [serverOtp, setServerOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const [timeLeft, setTimeLeft] = useState(80);
  let timer = null;
  useEffect(() => {
    // Check local storage login
    if (localStorage.getItem("login")) {
      router.push("/");
      return;
    }

    const storedNumber = sessionStorage.getItem("number");
    if (!storedNumber) {
      router.push("/login/phone-number");
    } else {
      setPhoneNumber(storedNumber);
      setIsLoaded(true);
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/otp/%2B92${storedNumber}`)
        .then((res) => {
          if (res.data && res.data.otp) {
            setServerOtp(res.data.otp.toString());
            handleSuccess("OTP sent successfully");
          }
        })
        .catch((err) => console.error("Error fetching OTP:", err));
    }
  }, [router]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

  const handleChange = (index, e) => {
    const val = e.target.value.replace(/\D/g, "");
    if (val) {
      const newOtp = [...otp];
      newOtp[index] = val.slice(-1);
      setOtp(newOtp);
      // Focus next
      if (index < 5) {
        inputRefs.current[index + 1].focus();
      } else if (index === 5) {
        setIsVerifying(true);
        const enteredOtp = newOtp.join("");
        setTimeout(() => {
          if (enteredOtp === serverOtp) {
            handleSuccess("OTP Verified successfully");
            axios
              .get(
                `${process.env.NEXT_PUBLIC_API_URL}/user/%2B92${phoneNumber}`,
              )
              .then((res) => {
                localStorage.setItem("login", JSON.stringify(res.data));
                setTimeout(() => {
                  sessionStorage.removeItem("number");
                  router.push("/");
                }, 1500);
              })
              .catch((err) => {
                if (err.response && err.response.status === 404) {
                  setTimeout(() => {
                    router.push("/register/personal-information");
                  }, 1500);
                } else {
                  console.error("Error checking user:", err);
                }
              });
          } else {
            handleError("Invalid OTP");
            setOtp(["", "", "", "", "", ""]);
            setIsVerifying(false);
            if (inputRefs.current[0]) {
              inputRefs.current[0].focus();
            }
          }
        }, 500);
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (otp[index]) {
        // if there's a value, clear it
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        // if already empty, focus previous and clear it
        inputRefs.current[index - 1].focus();
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  const handleResend = () => {
    if (timeLeft === 0) {
      setTimeLeft(80);
      // Resend logic would go here
      handleSuccess("OTP Resend successfully");
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleSuccess = (messgae) => {
    document.querySelector("#OtpSuccess div p").innerText = messgae;
    document.querySelector("#OtpSuccess").classList.add("!top-2");
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      document.querySelector("#OtpSuccess").classList.remove("!top-2");
    }, 2000);
  };

  const handleError = (messgae) => {
    document.querySelector("#OtpError div p").innerText = messgae;
    document.querySelector("#OtpError").classList.add("!top-2");
  };

  if (!isLoaded) return null;

  return (
    <div className="flex min-h-screen">
      <div
        id="OtpError"
        className="py-5 px-2 absolute -top-full z-2 left-1/2 -translate-x-1/2 font-bold bg-red-500  rounded-lg transition-top duration-300"
      >
        <p
          onClick={() =>
            document.querySelector("#OtpError").classList.remove("!top-2")
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
      <div
        id="OtpSuccess"
        className="py-5 px-2 absolute -top-full z-2 left-1/2 -translate-x-1/2 font-bold bg-green-500  rounded-lg transition-top duration-300"
      >
        <p
          onClick={() => {
            document.querySelector("#OtpSuccess").classList.remove("!top-2");
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
            OTP send successfully
          </p>
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
        <div className="flex-1 flex flex-col justify-center items-center max-w-lg mx-auto w-full">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            Enter The Code We Sent
          </h1>
          <p className="text-gray-400 mb-10 text-center">
            To your cell phone number{" "}
            <span className="text-gray-900 font-bold">+92{phoneNumber}</span>
          </p>

          <div className="flex gap-2 sm:gap-4 justify-center mb-10">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                value={digit}
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                disabled={isVerifying}
                className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-50 border border-gray-100 rounded-lg text-center text-2xl font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#FFD700] disabled:opacity-50 disabled:cursor-not-allowed"
              />
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 font-medium mt-4">
            <span>Didn't Receive OTP Code?</span>
            <button
              onClick={handleResend}
              disabled={timeLeft > 0}
              className={`font-bold transition-colors ${
                timeLeft > 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-orange-500 hover:text-orange-600 cursor-pointer"
              }`}
            >
              Resend
            </button>
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider">
              {formatTime(timeLeft)}
            </span>
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

export default function OtpPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <OtpContent />
    </Suspense>
  );
}
