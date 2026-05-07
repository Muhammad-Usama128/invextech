"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function EditProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  let timer = null;
  useEffect(() => {
    const loginData = localStorage.getItem("login");
    if (!loginData) {
      router.push("/");
    } else {
      const parsedUser = JSON.parse(loginData);
      setUser(parsedUser);
      setName(parsedUser.name || "");
      setDob(parsedUser.dateOfBirth || "");
    }
  }, [router]);

  if (!user) return null;

  let countryCode = "+92";
  let phoneNumber = user.number || "";

  if (phoneNumber.startsWith("+92")) {
    phoneNumber = phoneNumber.substring(3);
  }

  const isChanged =
    name !== (user.name || "") || dob !== (user.dateOfBirth || "");

  const handleUpdate = async () => {
    if (!isChanged) return;
    setIsUpdating(true);
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/${user._id}`,
        {
          name,
          dateOfBirth: dob,
        },
      );
      if (response.status === 200) {
        const updatedUser = response.data;
        localStorage.setItem("login", JSON.stringify(updatedUser));
        setUser(updatedUser);
        handleSuccess("Profile updated successfully");
      }
    } catch (err) {
      console.error(err);
      handleError(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleError = (messgae) => {
    document.querySelector("#editError div p").innerText = messgae;
    document.querySelector("#editError").classList.add("!top-2");
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      document.querySelector("#editError").classList.remove("!top-2");
    }, 2000);
  };
  const handleSuccess = (messgae) => {
    document.querySelector("#editSuccess div p").innerText = messgae;
    document.querySelector("#editSuccess").classList.add("!top-2");
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      document.querySelector("#editSuccess").classList.remove("!top-2");
    }, 2000);
  };
  return (
    <div className="w-full max-w-[550px] mx-auto mt-2">
      <div
        id="editSuccess"
        className="py-5 px-2 fixed -top-full z-10 left-1/2 -translate-x-1/2 font-bold bg-green-500  rounded-lg transition-top duration-300"
      >
        <p
          onClick={() => {
            document.querySelector("#editSuccess").classList.remove("!top-2");
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
      <div
        id="editError"
        className="py-5 px-2 fixed -top-full z-10 left-1/2 -translate-x-1/2 font-bold bg-red-500  rounded-lg transition-top duration-300"
      >
        <p
          onClick={() =>
            document.querySelector("#editError").classList.remove("!top-2")
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
      {/* Full Name */}
      <div className="mb-8">
        <label className="block text-black font-semibold text-[15px] mb-3">
          Full Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-[#f9f9f9] border-none rounded-xl px-4 py-3.5 text-black text-[15px] focus:outline-none focus:ring-2 focus:ring-[#ffcc00] transition"
          placeholder="Enter your full name"
        />
      </div>

      {/* Phone Number */}
      <div className="mb-8">
        <label className="block text-black font-semibold text-[15px] mb-3">
          Phone Number
        </label>
        <div className="flex gap-4">
          <div className="w-[80px] bg-[#f9f9f9] border-none rounded-xl flex items-center justify-center text-black text-[15px] font-medium">
            {countryCode}
          </div>
          <div className="flex-1 bg-[#f9f9f9] border-none rounded-xl px-4 py-3.5 flex items-center justify-between">
            <span className="text-black text-[15px] font-medium">
              {phoneNumber}
            </span>
            <span className="text-[#f55928] font-bold text-[13px] tracking-wide">
              VERIFIED
            </span>
          </div>
        </div>
      </div>

      {/* Date of Birthday */}
      <div className="mb-10">
        <label className="block text-black font-semibold text-[15px] mb-3">
          Date of Birthday
        </label>
        <div className="relative">
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full bg-[#f9f9f9] border-none rounded-xl px-4 py-3.5 text-black text-[15px] focus:outline-none focus:ring-2 focus:ring-[#ffcc00] transition pr-10 cursor-pointer"
          />
        </div>
      </div>

      {/* Update Button */}
      <button
        onClick={handleUpdate}
        disabled={!isChanged || isUpdating}
        className={`w-full font-bold py-4 rounded-xl transition text-[15px] tracking-wide ${
          isChanged && !isUpdating
            ? "bg-[#ffcc00] hover:bg-[#e6b800] text-black cursor-pointer"
            : "bg-[#ffcc00] text-black/50 cursor-not-allowed opacity-60"
        }`}
      >
        {isUpdating ? "UPDATING..." : "UPDATE"}
      </button>
    </div>
  );
}
