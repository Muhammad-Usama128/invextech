"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { addToCart, decreaseQty, clearCart } from "../../redux/cartSlice";

export default function CartPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items) || [];
  const [mounted, setMounted] = useState(false);
  let timer = null;
  useEffect(() => {
    setMounted(true);
    const loginData = localStorage.getItem("login");
    if (!loginData) {
      router.push("/");
    }
  }, [router]);

  if (!mounted) return null;

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );

  const handleOrder = async () => {
    if (cartItems.length === 0) {
      handleError("no item in cart");
      console.log("no item in cart");
    } else {
      try {
        const loginData = localStorage.getItem("login");
        if (!loginData) {
          router.push("/");
          return;
        }
        const user = JSON.parse(loginData);
        const userId = user._id;

        const dishes = cartItems
          .map(
            (item) =>
              `${item.qty} ${item.name} ${item.option ? `(${item.option})` : ""}`,
          )
          .join(", ");

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/order/${userId}`,
          {
            dishes,
            price: cartTotal,
          },
        );

        if (response.status === 200) {
          console.log("order added");
          handleSuccess("Order Placed Successfully");
          setTimeout(() => {
            dispatch(clearCart());
            router.push("/");
          }, 1500);
        }
      } catch (error) {
        console.error("Failed to place order", error);
        handleError("Failed to place order");
      }
    }
  };
  const handleError = (messgae) => {
    document.querySelector("#cartError div p").innerText = messgae;
    document.querySelector("#cartError").classList.add("!top-2");
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      document.querySelector("#cartError").classList.remove("!top-2");
    }, 2000);
  };

  const handleSuccess = (messgae) => {
    document.querySelector("#cartSuccess div p").innerText = messgae;
    document.querySelector("#cartSuccess").classList.add("!top-2");
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      document.querySelector("#cartSuccess").classList.remove("!top-2");
    }, 2000);
  };
  return (
    <div className="min-h-screen bg-white text-black font-sans pt-5 pb-5 px-4 md:px-8 lg:px-24">
      <div
        id="cartError"
        className="py-5 px-2 fixed -top-full z-10 left-1/2 -translate-x-1/2 font-bold bg-red-500  rounded-lg transition-top duration-300"
      >
        <p
          onClick={() =>
            document.querySelector("#cartError").classList.remove("!top-2")
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
        id="cartSuccess"
        className="py-5 px-2 fixed -top-full z-10 left-1/2 -translate-x-1/2 font-bold bg-green-500  rounded-lg transition-top duration-300"
      >
        <p
          onClick={() => {
            document.querySelector("#cartSuccess").classList.remove("!top-2");
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
      <div className="flex items-center mb-8">
        <Link
          href="/menu"
          className="text-2xl font-bold mr-4 cursor-pointer hover:opacity-80"
        >
          ←
        </Link>
        <h1 className="text-[32px] font-extrabold tracking-tight">Cart</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Left Side: Cart Items */}
        <div className="w-full lg:w-[55%] flex flex-col gap-6">
          {cartItems.length === 0 ? (
            <div className="py-20 bg-[#f9f9f9] rounded-2xl flex flex-col items-center justify-center">
              <p className="text-xl font-bold text-gray-500 mb-6">
                no item in Cart there
              </p>
              <Link href="/menu">
                <button className="cursor-pointer bg-[#ffcc00] hover:bg-[#e6b800] text-black font-bold py-3 px-8 rounded-xl transition">
                  BROWSE MENU
                </button>
              </Link>
            </div>
          ) : (
            <>
              {cartItems.map((item, index) => (
                <div
                  key={item.id || index}
                  className="bg-[#f9f9f9] rounded-2xl p-4 flex justify-between items-center shadow-sm"
                >
                  <div className="flex gap-4 items-center">
                    <div className="w-20 h-20 relative bg-white rounded-xl flex items-center justify-center p-2">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain"
                        />
                      ) : (
                        <Image
                          src="/Pizza-Loading.gif"
                          alt={item.name}
                          width={60}
                          height={60}
                          className="object-contain mix-blend-multiply"
                        />
                      )}
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="font-bold text-black text-[17px]">
                        {item.name}
                      </h3>
                      {item.option && (
                        <span className="text-gray-500 text-[13px] font-semibold mt-1">
                          {item.option}
                        </span>
                      )}
                      <span className="text-[#f55928] font-extrabold mt-1 text-[15px]">
                        Rs. {item.price.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mr-2">
                    <button
                      onClick={() => dispatch(decreaseQty(item.id))}
                      className={`cursor-pointer w-8 h-8 rounded-full ${item.qty === 1 ? "bg-[#f55928] text-white" : "bg-[#ffcc00] text-black"} flex items-center justify-center cursor-pointer transition-colors`}
                    >
                      {item.qty === 1 ? (
                        <span className="font-bold text-sm mb-0.5">🗑️</span>
                      ) : (
                        <span className="font-bold text-xl leading-none mb-0.5">
                          -
                        </span>
                      )}
                    </button>
                    <span className="font-bold text-black text-base w-6 text-center">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => dispatch(addToCart(item))}
                      className=" cursor-pointer w-8 h-8 rounded-full bg-[#ffcc00] text-black flex items-center justify-center transition-colors"
                    >
                      <span className="font-bold text-xl leading-none mb-0.5">
                        +
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Right Side: Total Summary */}
        <div className="w-full lg:w-[45%] flex flex-col pt-1">
          <h2 className="text-[28px] font-extrabold mb-6">Total</h2>

          <p className="text-gray-500 font-medium mb-6 text-[17px]">
            Estimated Delivery Time 45 Mins
          </p>

          <div className="flex flex-col gap-4 mb-6 border-b border-gray-200 pb-6">
            {cartItems.length === 0 && (
              <div className="flex justify-between items-center text-[15px] font-medium text-gray-500">
                <span className="flex-1">-</span>
                <span>Rs. 0</span>
              </div>
            )}
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center text-[15px] font-medium text-gray-500"
              >
                <span className="flex-1">
                  {item.qty} x {item.name}
                </span>
                <span>Rs. {(item.price * item.qty).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mb-8">
            <span className="text-[22px] font-extrabold text-black">
              Due Payment
            </span>
            <span className="text-[22px] font-extrabold text-black">
              Rs. {cartTotal.toLocaleString()}
            </span>
          </div>
          <button
            onClick={handleOrder}
            className=" cursor-pointer w-full bg-[#ffcc00] hover:bg-[#e6b800] text-black font-extrabold py-4 rounded-xl transition text-[15px] tracking-wide"
          >
            ORDER NOW
          </button>
        </div>
      </div>
    </div>
  );
}
