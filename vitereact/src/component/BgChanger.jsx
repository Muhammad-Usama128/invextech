import React, { useState } from "react";

const BgChanger = () => {
  const [bgColor, setBgColor] = useState("");
  return (
    <div className={`w-full h-screen ${bgColor} flex justify-center`}>
      <div className="flex justify-center items-center gap-4 align-middle mt-10 fixed bottom-4 bg-white p-4 rounded-lg shadow-lg">
        <button
          className="bg-red-500 cursor-pointer text-white  px-6 py-2 rounded-3xl"
          onClick={() => setBgColor("bg-red-500")}
        >
          Red
        </button>
        <button
          className="bg-blue-500 cursor-pointer text-white   px-6 py-2 rounded-3xl"
          onClick={() => setBgColor("bg-blue-500")}
        >
          Blue
        </button>
        <button
          className="bg-green-500 cursor-pointer text-white px-6 py-2 rounded-3xl "
          onClick={() => setBgColor("bg-green-500")}
        >
          Green
        </button>
        <button
          className="bg-yellow-500 cursor-pointer text-white px-6 py-2 rounded-3xl "
          onClick={() => setBgColor("bg-yellow-500")}
        >
          Yellow
        </button>
        <button
          className="bg-gray-500 cursor-pointer text-white  px-6 py-2 rounded-3xl "
          onClick={() => setBgColor("bg-gray-500")}
        >
          Gray
        </button>
        <button
          className="bg-black cursor-pointer text-white px-6 py-2 rounded-3xl "
          onClick={() => setBgColor("bg-black")}
        >
          Black
        </button>
        <button
          className="bg-pink-500 cursor-pointer text-white px-6 py-2 rounded-3xl "
          onClick={() => setBgColor("bg-pink-500")}
        >
          Pink
        </button>
      </div>
    </div>
  );
};

export default BgChanger;
