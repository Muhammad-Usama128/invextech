"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, decreaseQty } from "../../redux/cartSlice";
import { clearLiked, restoreLiked } from "../../redux/likedSlice";
import LocationPickerModal from "../LocationPickerModal";
const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cart = cartItems || [];
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const [isLocationPickerOpen, setIsLocationPickerOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [userLogin, setUserLogin] = useState(null);
  let timer = null;

  const updateAddress = () => {
    const existing = JSON.parse(localStorage.getItem("savedAddresses") || "[]");
    if (existing.length > 0) {
      setSelectedAddress(existing[0]);
    } else {
      setSelectedAddress("");
    }
  };

  useEffect(() => {
    updateAddress();
    const openModal = () => setIsLocationPickerOpen(true);
    window.addEventListener("openLocationPicker", openModal);
    return () => window.removeEventListener("openLocationPicker", openModal);
  }, []);

  useEffect(() => {
    const loginData = localStorage.getItem("login");
    if (loginData) {
      try {
        setUserLogin(JSON.parse(loginData));
        dispatch(restoreLiked());
      } catch (e) {
        console.error("Invalid login data in localStorage", e);
      }
    } else {
      setUserLogin(null);
      dispatch(clearLiked());
    }
  }, [pathname, dispatch]);

  const smallNav = () => {
    const smallNavDiv = document.getElementById("smallNav-div");
    const smallNav = document.getElementById("smallNav");
    if (smallNav.style.left === "0px") {
      smallNav.style.left = "-100%";
      setTimeout(() => {
        smallNavDiv.classList.add("hidden");
      }, 300);
      document.body.style.overflow = "auto";
    } else {
      smallNavDiv.classList.remove("hidden");
      setTimeout(() => {
        smallNav.style.left = "0px";
      }, 10);
      document.body.style.overflow = "hidden";
    }
  };

  const handleError = () => {
    if (cartItems.length === 0) {
      document.querySelector("#Error div p").innerText = "Cart is empty.";
      document.querySelector("#Error").classList.add("!top-2");
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        document.querySelector("#Error").classList.remove("!top-2");
        document.querySelector("#Error div p").innerText = "";
      }, 2000);
    } else {
      router.push("/cart");
    }
  };

  const handleSearch = (e) => {
    let totalFound = 0;

    if (e.target.value === "") {
      document.querySelector("#carousel2").style.display = "flex";
      document.querySelector("#SearchCards").style.display = "none";
      document.querySelector("#Cards").style.display = "block";
    } else {
      document.querySelector("#carousel2").style.display = "none";
      document.querySelector("#SearchCards").style.display = "flex";
      document.querySelector("#Cards").style.display = "none";
      document.querySelectorAll("#SearchCards .MenuCard").forEach((item) => {
        if (
          item
            .querySelector(".MenuCardName")
            .innerText.toLowerCase()
            .includes(e.target.value.toLowerCase())
        ) {
          totalFound++;
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
      });
      document.querySelector("#TotalFound").innerText =
        `${totalFound} items found`;
    }
  };
  return (
    <header className=" p-4 z-10 bg-white sticky w-full top-0 shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
      <div
        id="Error"
        className="py-5 px-2 fixed -top-full z-2 left-1/2 -translate-x-1/2 font-bold bg-red-500  rounded-lg transition-top duration-300"
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
          <p className="text-white text-lg max-lg:text-base"></p>
        </div>
      </div>
      <div
        id="Success"
        className="py-5 px-2 fixed -top-full z-2 left-1/2 -translate-x-1/2 font-bold bg-green-500  rounded-lg transition-top duration-300"
      >
        <p
          onClick={() => {
            document.querySelector("#Success").classList.remove("!top-2");
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
          <p className="text-white text-lg max-lg:text-base"></p>
        </div>
      </div>
      <div
        id="smallNav-div"
        className="absolute top-0 left-0 z-50 hidden bg-black/50 w-full h-screen"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            smallNav();
          }
        }}
      >
        <div
          id="smallNav"
          className="absolute top-0 -left-full transition-left opacity-100 duration-300 w-96 h-screen bg-white flex flex-col max-sm:w-70"
        >
          <div className="flex-1  pt-20 px-10">
            {userLogin ? (
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-lg font-bold">{userLogin.name}</p>
                  <p className="text font-medium text-gray-500 mt-2">
                    {userLogin.number}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Image
                  src="/Small-Nav-Icon.png"
                  className="w-12 h-auto"
                  width={0}
                  height={0}
                  sizes="100vw"
                  alt="Small Nav Icon"
                />
                <div>
                  <p className="text-sm">Login to explore</p>
                  <p className=" text-sm font-bold mt-2">World of flavors</p>
                </div>
              </div>
            )}
            <div className="mt-8 pb-6 border-b-[1.5px] border-gray-300">
              <button
                onClick={() => {
                  if (userLogin) {
                    localStorage.removeItem("login");
                    setUserLogin(null);
                    dispatch(clearLiked());
                    router.push("/login");
                    smallNav();
                  } else {
                    router.push("/login");
                    smallNav();
                  }
                }}
                className="text-sm font-medium px-3 py-2 border-[0.5px] rounded-lg hover:bg-orange-500 hover:text-white transition-colors duration-300 flex gap-2 items-center w-max cursor-pointer"
              >
                {userLogin ? "LOGOUT" : "LOGIN"}
              </button>
            </div>
            <div className="mt-8 pb-8 border-b-[1.5px] border-gray-300 flex-col flex gap-8">
              <Link href="/menu" className="flex gap-1.5 items-center">
                <Image
                  src="/Small-Nav-Explore-Icon.png"
                  className="w-5 h-5"
                  width={0}
                  height={0}
                  sizes="100vw"
                  alt="Small Nav Explore"
                />
                <span className="font-bold ml-3">Explore Menu</span>
              </Link>
              <Link href="#" className="flex gap-1.5 items-center">
                <Image
                  src="/Branch-Locator-Icon.png"
                  className="w-5 h-5"
                  width={0}
                  height={0}
                  sizes="100vw"
                  alt="Small Nav Explore"
                />
                <span className="font-bold ml-3">Branch Locator</span>
              </Link>
            </div>
            <div className="mt-8 flex-col flex gap-6">
              <Link href="/blog">Blogs</Link>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </div>
          </div>
          <div className="flex justify-center items-center gap-3 cursor-pointer bg-yellow-300 py-5">
            <Image
              src="/Footer-Logo.png"
              className="w-6 h-auto"
              width={0}
              height={0}
              sizes="100vw"
              alt="Cheezious Logo"
            />
            <p>Cheezius Hotline</p>
            <Image
              src="/Call-Icon.png"
              className="w-8 h-auto"
              width={0}
              height={0}
              sizes="100vw"
              alt="Call"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center gap-3">
          <div
            onClick={smallNav}
            className="flex flex-col justify-center items-end gap-1.5 cursor-pointer"
          >
            <div className="w-5 h-0.75 bg-orange-600 rounded-lg"></div>
            <div className="w-7 h-0.75 bg-orange-600 rounded-lg"></div>
            <div className="w-3.5 h-0.75 bg-orange-600 rounded-lg"></div>
          </div>
          <Link href="/" className="cursor-pointer">
            <Image
              src="/cheezious-logo.png"
              alt="Cheezious Logo"
              width={0}
              height={0}
              sizes="100vw"
              className="w-42 max-lg:hidden"
            />
          </Link>
        </div>
        <Link href="/" className="cursor-pointer">
          <Image
            src="/cheezious-logo.png"
            alt="Cheezious Logo"
            className="w-42 lg:hidden"
            width={0}
            height={0}
            sizes="100vw"
          />
        </Link>
        {pathname === "/menu" && (
          <div className="flex gap-1.5 max-lg:hidden mx-2">
            <input
              type="text"
              className="bg-gray-100 outline-none px-4 py-2 rounded-md flex-1 w-[30vw]"
              placeholder="🔍 Find in Cheezious"
              onChange={handleSearch}
            />
            <input
              type="text"
              className="border border-gray-400 text-gray-400 px-4 py-2 rounded-md outline-none cursor-pointer text-ellipsis whitespace-nowrap overflow-hidden max-w-[200px]"
              placeholder="📍 Enter the Delivery Location"
              value={selectedAddress ? `📍 ${selectedAddress}` : ""}
              readOnly
              onClick={() => setIsLocationPickerOpen(true)}
            />
          </div>
        )}
        <div className="flex justify-center items-center gap-7 max-lg:gap-5">
          <div className="relative group">
            <button
              onClick={handleError}
              className="flex gap-2 relative cursor-pointer font-bold lg:bg-yellow-300 lg:px-6 lg:py-3 rounded-md "
            >
              <Image
                src="/cart-icon.png"
                alt="Cart"
                className="w-5 h-5 max-lg:hidden"
                width={0}
                height={0}
                sizes="100vw"
              />
              <p className="max-lg:hidden">CART</p>
              <Image
                src="/Cart-Icon-Outline.png"
                className="w-8 h-auto lg:hidden"
                width={0}
                height={0}
                sizes="100vw"
                alt="Cart"
              />
              <div className="absolute top-0 m-0.5 -right-3 rounded-full bg-white">
                <span className="bg-red-500 text-white m-0.5 text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItems.length}
                </span>
              </div>
            </button>
            <div className="absolute top-12 -right-20 max-lg:hidden hidden group-hover:block">
              <div className="hidden lg:block">
                {cart.length === 0 ? (
                  <div className="w-xs h-80 bg-white rounded-lg p-6">
                    <div className="overflow-y-auto h-50">
                      <div className="flex w-full flex-col justify-center items-center">
                        <Image
                          className="w-30 h-auto"
                          src="/Empty-Cart-Icon.png"
                          width={0}
                          height={0}
                          sizes="100vw"
                          alt="Cart"
                        />
                        <h1 className="text-xl font-bold mt-3">
                          Your Cart is Empty
                        </h1>
                        <p className="text-gray-500">
                          Go ahead and explore top categories
                        </p>
                      </div>
                    </div>
                    <Link href="/cart">
                      <button className=" cursor-pointer w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg transition opacity-0">
                        CHECKOUT
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="w-xs h-80 bg-white rounded-xl p-4 flex flex-col">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6 px-2">
                      <span className="text-xl font-bold text-[#f55928]">
                        Total
                      </span>
                      <span className="text-xl font-bold text-[#f55928]">
                        Rs. {cartTotal.toLocaleString()}
                      </span>
                    </div>

                    {/* Cart Items */}
                    <div className="overflow-y-auto pr-2 space-y-4 flex-1 custom-scrollbar">
                      {cart.map((item, index) => (
                        <div
                          key={item.id || index}
                          className="bg-white rounded-2xl p-4 shadow-sm"
                        >
                          <div className="flex gap-4">
                            {/* Image Placeholder */}
                            <div className="w-16 h-16 relative flex-shrink-0 flex items-center justify-center">
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

                            <div className="flex-1 flex flex-col justify-between">
                              <h3 className="font-bold text-black text-2xl leading-tight">
                                {item.name}
                              </h3>

                              {/* Option */}
                              {item.option && (
                                <div className="flex justify-between text-gray-500 text-xs font-semibold mt-1">
                                  <span>{item.option}</span>
                                </div>
                              )}

                              {/* Price & Quantity Controls */}
                              <div className="flex justify-between items-end mt-3">
                                <span className="text-[#f55928] font-bold text-lg">
                                  Rs. {item.price.toLocaleString()}
                                </span>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() =>
                                      dispatch(decreaseQty(item.id))
                                    }
                                    className={`w-6 h-6 rounded-full ${item.qty === 1 ? "bg-red-500" : "bg-[#ffcc00]"} flex items-center justify-center cursor-pointer transition-colors`}
                                  >
                                    {item.qty !== 1 ? (
                                      <span className="text-black font-bold text-lg leading-none mb-0.5">
                                        -
                                      </span>
                                    ) : (
                                      <span className="font-bold leading-none text-sm mb-0.5">
                                        🗑️
                                      </span>
                                    )}
                                  </button>
                                  <span className="font-bold text-black text-sm w-4 text-center">
                                    {item.qty}
                                  </span>
                                  <button
                                    onClick={() => dispatch(addToCart(item))}
                                    className="w-6 h-6 rounded-full bg-[#ffcc00] flex items-center justify-center cursor-pointer hover:bg-yellow-500 transition-colors"
                                  >
                                    <span className="text-black font-bold text-lg leading-none mb-0.5">
                                      +
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Checkout Button */}
                    <div className="mt-4 pt-2">
                      <Link href="/cart">
                        <button className="cursor-pointer w-full bg-[#ffcc00] hover:bg-[#e6b800] text-black font-bold py-3.5 rounded-xl transition text-[15px]">
                          CHECKOUT
                        </button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <Link
            href={userLogin ? "/account/edit-profile" : "/login"}
            className="flex gap-2 font-bold lg:bg-yellow-300 lg:px-6 lg:py-3 rounded-md items-center"
          >
            <Image
              src="/person-icon.png"
              className="w-5 h-5 max-lg:hidden"
              alt="Login"
              width={0}
              height={0}
              sizes="100vw max-lg:hidden"
            />
            <p className="max-lg:hidden">{userLogin ? "ACCOUNT" : "LOGIN"}</p>
            <Image
              src="/Person-Icon-Outline.png"
              className="w-7 h-7 lg:hidden"
              width={0}
              height={0}
              sizes="100vw"
              alt="Login Icon"
            />
          </Link>
        </div>
      </div>
      {pathname === "/menu" && (
        <>
          <div
            onClick={() => setIsLocationPickerOpen(true)}
            className="flex justify-center items-center mt-6 cursor-pointer lg:hidden px-4"
          >
            <Image
              src="/Location-Icon.png"
              className="w-8 h-auto shrink-0"
              width={0}
              height={0}
              sizes="100vw"
              alt="Location Icon"
            />
            <p className="text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis ml-2 max-w-[80vw]">
              {selectedAddress || "Select Address"}
            </p>
          </div>
          <input
            type="text"
            className="bg-gray-100 outline-none w-full px-4 py-2 rounded-md mt-3 lg:hidden"
            placeholder="🔍 Find in Cheezious"
            onChange={handleSearch}
          />
        </>
      )}
      <LocationPickerModal
        isOpen={isLocationPickerOpen}
        onClose={() => {
          setIsLocationPickerOpen(false);
          updateAddress();
        }}
      />
    </header>
  );
};

export default Navbar;
