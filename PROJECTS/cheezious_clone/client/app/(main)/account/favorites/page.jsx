"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Image from "next/image";
import { handleLike } from "@/app/redux/likedSlice";
import { addToCart } from "@/app/redux/cartSlice";

export default function FavoritesPage() {
  const dispatch = useDispatch();
  const likedIds = useSelector((state) => state.liked.liked) || [];

  const [allDiscs, setAllDiscs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");

  let timer = null;

  useEffect(() => {
    const fetchDiscs = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/discs`,
        );
        setAllDiscs(response.data);
      } catch (err) {
        console.error("Failed to fetch discs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDiscs();
  }, []);

  const favoriteDiscs = allDiscs.filter((disc) => likedIds.includes(disc._id));

  const onRemoveFavorite = (id) => {
    dispatch(handleLike(id));
    handleSuccess("Item removed successfully");
  };

  const handleAddToCartClick = (item) => {
    if (item.option && item.option.data) {
      setSelectedItem(item);
      setSelectedOption("");
      setIsModalOpen(true);
      document.body.style.overflow = "hidden";
    } else {
      dispatch(addToCart({ ...item, qty: 1 }));
      console.log("item added in cart");
    }
  };

  const handleModalAddToCart = () => {
    if (!selectedOption) {
      handleError("please choose an option");
      return;
    }

    let priceToAdd = selectedItem.price;
    if (Array.isArray(selectedItem.option.data)) {
      priceToAdd = selectedItem.price;
    } else {
      priceToAdd = selectedItem.option.data[selectedOption];
    }

    dispatch(
      addToCart({
        ...selectedItem,
        price: priceToAdd,
        option: selectedOption,
        qty: 1,
      }),
    );
    handleSuccess("Item added successfully");
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const handleSuccess = (messgae) => {
    document.querySelector("#favoriteSuccess div p").innerText = messgae;
    document.querySelector("#favoriteSuccess").classList.add("!top-2");
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      document.querySelector("#favoriteSuccess").classList.remove("!top-2");
    }, 2000);
  };

  const handleError = (messgae) => {
    document.querySelector("#favoritesError div p").innerText = messgae;
    document.querySelector("#favoritesError").classList.add("!top-2");
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      document.querySelector("#favoritesError").classList.remove("!top-2");
    }, 2000);
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center mt-4">
        <p className="text-gray-500 font-medium">Loading favorites...</p>
      </div>
    );
  }

  if (favoriteDiscs.length === 0) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-10 mb-10">
        <Image
          src="/No-Item-Icon.png"
          alt="No favorites"
          width={150}
          height={150}
          className="mb-4 object-contain"
        />
      </div>
    );
  }

  return (
    <div className="w-full mt-4 flex flex-col items-center">
      <div
        id="favoriteSuccess"
        className="py-5 px-2 fixed -top-full z-10 left-1/2 -translate-x-1/2 font-bold bg-green-500  rounded-lg transition-top duration-300"
      >
        <p
          onClick={() => {
            document
              .querySelector("#favoriteSuccess")
              .classList.remove("!top-2");
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
      <div className="flex flex-col gap-4 w-full max-w-[550px]">
        {favoriteDiscs.map((item) => (
          <div
            key={item._id}
            className="bg-[#f9f9f9] rounded-xl p-4 flex gap-4 items-center w-full relative shadow-sm border border-gray-100"
          >
            {/* Left side: Image */}
            <div className="w-28 h-28 relative bg-white rounded-lg flex items-center justify-center p-2 shrink-0">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="text-gray-400 text-sm">No Image</div>
              )}
            </div>

            {/* Right side: Details */}
            <div className="flex flex-col flex-1 py-1 pr-6">
              <h3 className="text-lg font-bold text-black mb-1">
                {item.name}.
              </h3>
              <p className="text-gray-600 text-sm font-medium mb-4 line-clamp-1">
                {item.description}
              </p>

              <div className="flex justify-between items-center mt-auto">
                <div className="flex items-end gap-1">
                  <span className="text-[#f55928] font-bold text-[13px] mb-[2px]">
                    Rs.
                  </span>
                  <span className="text-[#f55928] font-extrabold text-xl leading-none">
                    {item.price}
                  </span>
                </div>
                <button
                  onClick={() => handleAddToCartClick(item)}
                  className="text-[#f55928] font-bold text-[15px] cursor-pointer hover:opacity-80 transition-opacity"
                >
                  Add To Cart
                </button>
              </div>
            </div>

            {/* Absolute Heart Icon */}
            <button
              onClick={() => onRemoveFavorite(item._id)}
              className="absolute top-4 right-4 w-8 h-8 bg-[#f55928] rounded-full flex items-center justify-center cursor-pointer hover:bg-orange-600 transition-colors shadow-sm"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {isModalOpen && selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-4"
          onClick={() => {
            setIsModalOpen(false);
            document.body.style.overflow = "auto";
          }}
        >
          <div
            id="favoritesError"
            className="py-5 px-2 absolute -top-full z-2 left-1/2 -translate-x-1/2 font-bold bg-red-500  rounded-lg transition-top duration-300"
          >
            <p
              onClick={(e) => {
                document
                  .querySelector("#favoritesError")
                  .classList.remove("!top-2");
                if (timer) {
                  clearTimeout(timer);
                }
              }}
              className="text-sm absolute right-2 top-2 font-light cursor-pointer hover:font-bold"
            >
              X
            </p>
            <div className="relative flex justify-center items-center gap-2 mr-7">
              <span className="h-6 w-6 text-red-500 flex justify-center items-center rounded-full bg-white">
                !
              </span>
              <p className="text-white text-lg">please choose an option.</p>
            </div>
          </div>
          <div
            className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="overflow-y-auto relative flex-1 flex flex-col">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  document.body.style.overflow = "auto";
                }}
                className="absolute top-4 right-4 text-[#f55928] hover:text-white hover:bg-[#f55928] rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl z-10 transition-colors"
              >
                ✕
              </button>

              <div className="relative w-full h-72 shrink-0 bg-white p-8">
                <div className="relative w-full h-full mt-4">
                  {selectedItem.image ? (
                    <Image
                      src={selectedItem.image}
                      alt={selectedItem.name}
                      fill
                      className="object-contain"
                    />
                  ) : null}
                </div>
              </div>

              <div className="p-6 flex flex-col">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedItem.name}
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  {selectedItem.description}
                </p>

                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-[#f55928] text-white px-3 py-1 rounded-full text-sm font-bold">
                    Starting Price
                  </span>
                  <span className="text-[#f55928] font-bold text-xl">
                    Rs. {selectedItem.price.toLocaleString()}
                  </span>
                </div>

                <div className="mb-4 flex justify-between items-center p-2 rounded-lg">
                  <h3 className="font-bold text-[#f55928]">
                    Choose Your {selectedItem.option.type}
                  </h3>
                  <span className="bg-[#ffcc00] text-xs text-black font-bold px-2 py-1 rounded-full">
                    REQUIRED
                  </span>
                </div>

                <div className="space-y-4 mb-8">
                  {Array.isArray(selectedItem.option.data)
                    ? selectedItem.option.data.map((opt) => (
                        <label
                          key={opt}
                          className="flex items-center gap-3 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name={`option-${selectedItem._id}`}
                            className="w-5 h-5 accent-[#ffcc00]"
                            onChange={() => setSelectedOption(opt)}
                            checked={selectedOption === opt}
                          />
                          <span className="text-gray-700 font-medium">
                            {opt}
                          </span>
                        </label>
                      ))
                    : Object.entries(selectedItem.option.data).map(
                        ([size, price]) => (
                          <label
                            key={size}
                            className="flex justify-between items-center cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="radio"
                                name={`option-${selectedItem._id}`}
                                className="w-5 h-5 accent-[#ffcc00]"
                                onChange={() => setSelectedOption(size)}
                                checked={selectedOption === size}
                              />
                              <span className="text-gray-700 font-medium">
                                {size}
                              </span>
                            </div>
                            <span className="font-medium text-gray-900">
                              {price} Rs
                            </span>
                          </label>
                        ),
                      )}
                </div>
              </div>
            </div>
            <div className="p-6 bg-white border-t border-gray-200 shadow-sm shrink-0">
              <button
                onClick={handleModalAddToCart}
                className="w-full bg-[#ffcc00] cursor-pointer hover:bg-yellow-500 text-black font-bold py-4 rounded-xl transition-colors"
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
