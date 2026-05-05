import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { handleLike } from "@/app/redux/likedSlice";
import { addToCart } from "@/app/redux/cartSlice";

const Menu = ({ item, onAddToCart }) => {
  const dispatch = useDispatch();
  const likedIds = useSelector((state) => state.liked.liked);
  const [isClient, setIsClient] = useState(false); // ✅ track if client mounted
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  let timer = null;

  const hasOptions = item.option && Object.keys(item.option).length > 0;

  useEffect(() => {
    setIsClient(true); // ✅ only true on client, never on server
  }, []);

  // ✅ On server → always false (no mismatch)
  // ✅ On client → reads from Redux (which loaded from localStorage)
  const isLiked = isClient ? likedIds.includes(item._id) : false;

  const handleError = (messgae) => {
    document.querySelector("#Error div p").innerText = messgae;
    document.querySelector("#Error").classList.add("!top-2");
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      document.querySelector("#Error").classList.remove("!top-2");
      document.querySelector("#Error div p").innerText = "";
    }, 2000);
  };
  const handleMenuError = (messgae) => {
    document.querySelector("#MenuError div p").innerText = messgae;
    document.querySelector("#MenuError").classList.add("!top-2");
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      document.querySelector("#MenuError").classList.remove("!top-2");
    }, 2000);
  };
  const handleSuccess = () => {
    if (likedIds.includes(item._id)) {
      document.querySelector("#Success div p").innerText =
        "Product has been removed from your favourites.";
    } else {
      document.querySelector("#Success div p").innerText =
        "Product has been added to you favourites.";
    }
    document.querySelector("#Success").classList.add("!top-2");
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      document.querySelector("#Success").classList.remove("!top-2");
      document.querySelector("#Success div p").innerText = "";
    }, 2000);
  };

  const handleModalAddToCart = () => {
    if (!selectedOption) {
      handleMenuError("Please choose an option.");
      return;
    }

    let finalPrice = item.price;
    if (item.option.type === "Size") {
      finalPrice = item.option.data[selectedOption];
    }

    const cartItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: item.name,
      image: item.image,
      qty: 1,
      option: `${item.option.type}: ${selectedOption}`,
      price: finalPrice,
    };

    dispatch(addToCart(cartItem));

    const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (localCart.length === 0) {
      localStorage.setItem("cart", JSON.stringify([]));
    }

    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <div className="MenuCard bg-gray-100 relative w-[17rem] rounded-2xl flex flex-col">
        <div
          className="absolute right-2 top-2 z-2 cursor-pointer"
          onClick={() => {
            if (localStorage.getItem("login")) {
              handleSuccess();
              dispatch(handleLike(item._id));
            } else {
              handleError("Please log in to mark as favorite.");
            }
          }}
        >
          <Image
            className="w-4 h-auto "
            src={isLiked ? "/Heart-Filled.png" : "/Heart-Outline.png"}
            height={0}
            width={0}
            sizes="100vw"
            alt="Heart Icon"
          />
        </div>
        {/* Image Container */}
        <div className="relative w-full h-56 bg-white shrink-0">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover w-full h-auto"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={false}
          />
        </div>

        {/* Content Container */}
        <div className="p-4 flex flex-col flex-1">
          {/* Product Name */}
          <h3 className="MenuCardName font-bold text-gray-900 mb-2 line-clamp-2 text-2xl">
            {item.name}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-gray-600 mb-4 line-clamp-3">
            {item.description}
          </p>

          {/* Price and Button Container */}
          <div className="pt-3 border-t border-gray-100 space-y-3 mt-auto">
            {/* Price with Badge */}
            <div className="flex justify-between items-center gap-2">
              <span className="text-2xl font-bold text-orange-600">
                Rs. {item.price.toLocaleString()}
              </span>
              {hasOptions && (
                <span className="bg-orange-500 text-nowrap text-white font-bold px-3 py-1 rounded-full">
                  Starting Price
                </span>
              )}
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={() => {
                const savedAddresses = JSON.parse(
                  localStorage.getItem("savedAddresses") || "[]",
                );
                if (savedAddresses.length === 0) {
                  window.dispatchEvent(new Event("openLocationPicker"));
                  return;
                }

                if (!localStorage.getItem("login")) {
                  handleError("Please log in to add items to your cart.");
                  return;
                }

                if (!hasOptions) {
                  const cartItem = {
                    id: Math.random().toString(36).substr(2, 9),
                    name: item.name,
                    image: item.image,
                    qty: 1,
                    option: "",
                    price: item.price,
                  };
                  dispatch(addToCart(cartItem));

                  const localCart = JSON.parse(
                    localStorage.getItem("cart") || "[]",
                  );
                  if (localCart.length === 0) {
                    localStorage.setItem("cart", JSON.stringify([]));
                  }
                } else {
                  setIsModalOpen(true);
                  setSelectedOption(null);
                  document.body.style.overflow = "hidden";
                }
              }}
              className="w-full px-3 py-4 font-bold text-sm rounded-2xl bg-white hover:text-white cursor-pointer hover:bg-orange-500 transition-colors duration-200 mt-2"
            >
              + ADD TO CART
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-4"
          onClick={() => {
            setIsModalOpen(false);
            document.body.style.overflow = "auto";
          }}
        >
          <div
            id="MenuError"
            className="py-5 px-2 fixed -top-full z-2 left-1/2 -translate-x-1/2 font-bold bg-red-500  rounded-lg transition-top duration-300"
          >
            <p
              onClick={(e) => {
                document.querySelector("#MenuError").classList.remove("!top-2");
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
              <p className="text-white text-lg max-lg:text-base">
                please choose an option.
              </p>
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
                className="absolute top-4 right-4 text-orange-500 hover:text-white hover:bg-orange-500 rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl z-10 transition-colors"
              >
                ✕
              </button>

              <div className="relative w-full h-72 shrink-0 bg-white p-8">
                <div className="relative w-full h-full mt-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="p-6 flex flex-col">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {item.name}
                </h2>
                <p className="text-sm text-gray-600 mb-4">{item.description}</p>

                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    Starting Price
                  </span>
                  <span className="text-orange-500 font-bold text-xl">
                    Rs. {item.price.toLocaleString()}
                  </span>
                </div>

                <div className="mb-4 flex justify-between items-center p-2 rounded-lg">
                  <h3 className="font-bold text-orange-500">
                    Choose Your {item.option.type}
                  </h3>
                  <span className="bg-yellow-400 text-xs text-black font-bold px-2 py-1 rounded-full">
                    REQUIRED
                  </span>
                </div>

                <div className="space-y-4 mb-8">
                  {Array.isArray(item.option.data)
                    ? item.option.data.map((opt) => (
                        <label
                          key={opt}
                          className="flex items-center gap-3 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name={`option-${item._id}`}
                            className="w-5 h-5 accent-yellow-400"
                            onChange={() => setSelectedOption(opt)}
                            checked={selectedOption === opt}
                          />
                          <span className="text-gray-700 font-medium">
                            {opt}
                          </span>
                        </label>
                      ))
                    : Object.entries(item.option.data).map(([size, price]) => (
                        <label
                          key={size}
                          className="flex justify-between items-center cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name={`option-${item._id}`}
                              className="w-5 h-5 accent-yellow-400"
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
                      ))}
                </div>
              </div>
              {/* End of scrollable container */}
            </div>
            <div className="p-6 bg-white border-t border-gray-200 shadow-sm shrink-0">
              <button
                onClick={handleModalAddToCart}
                className="w-full bg-yellow-400 cursor-pointer hover:bg-yellow-500 text-black font-bold py-4 rounded-xl transition-colors"
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Menu;
