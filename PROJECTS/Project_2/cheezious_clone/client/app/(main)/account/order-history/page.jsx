"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

export default function OrderHistoryPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const loginData = localStorage.getItem("login");
      if (!loginData) {
        router.push("/");
        return;
      }
      const user = JSON.parse(loginData);
      try {
        const response = await axios.get(
          `http://localhost:3001/order/${user._id}`,
        );
        setOrders(response.data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [router]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    let formatted = date.toLocaleString("en-US", options);
    return formatted.replace(" PM", "pm").replace(" AM", "am");
  };

  if (loading) {
    return (
      <div className="w-full max-w-[650px] mx-auto mt-2">
        <p className="text-gray-500 text-center font-medium">
          Loading your orders...
        </p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="w-full max-w-[650px] mx-auto mt-10 mb-10 flex flex-col items-center justify-center">
        <Image
          src="/No-Item-Icon.png"
          alt="No orders"
          width={150}
          height={150}
          className="mb-4 object-contain"
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-[550px] mx-auto mt-2">
      {orders.map((order) => (
        <div key={order._id} className="bg-[#f9f9f9] rounded-xl p-5 mb-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-base font-bold text-black">
              Cheezious - Okara
            </h2>
            <span className="bg-[#f55928] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
              {order.status === "pending" ? "PREPARING" : order.status}
            </span>
          </div>

          <div className="border-b border-gray-200 mb-4"></div>

          <div className="flex flex-col">
            <p className="text-[15px] font-bold text-black mb-2">
              {order.dishes}
            </p>
            <p className="text-gray-500 text-[13px] font-medium mb-3">
              {formatDate(order.createdAt)}
            </p>
            <div className="flex justify-between items-center">
              <p className="text-[15px] font-bold text-black">
                Rs. {order.price.toLocaleString()}
              </p>
              <p className="text-[#f55928] font-bold text-[14px]">45 min left</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
