"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCart, addToCart, decreaseQty } from "../../redux/cartSlice";
import Image from "next/image";
import Link from "next/link";
import Menu from "../../components/ui/Menu";
import { useSearchParams } from "next/navigation";

const categories = [
  "Zalmi Meal",
  "Malai Tikka",
  "Thin Crust Pizza",
  "Starters",
  "Somewhat Local",
  "Somewhat Sooper",
  "Addons",
  "Soft Drinks",
];

import axios from "axios";

const MenuContent = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Zalmi Meal");
  const tabsRef = useRef(null);
  const tabRefs = useRef({});
  const categoryRefs = useRef({});
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/discs");
        setMenuData(response.data);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenuData();
  }, []);

  useEffect(() => {
    const activeTab = tabRefs.current[activeCategory];
    if (activeTab) {
      activeTab.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeCategory]);

  // Handle category click with smooth scroll
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    const element = categoryRefs.current[category];
    if (element) {
      // Use window.scrollTo instead of scrollIntoView to prevent conflicts
      // with the horizontal tab scrollIntoView happening simultaneously.
      const y = element.getBoundingClientRect().top + window.scrollY - 180;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const lastScrolledCategoryRef = useRef(null);

  // Handle URL category scrolling
  useEffect(() => {
    if (loading || menuData.length === 0) return;

    if (categoryParam && categoryParam !== lastScrolledCategoryRef.current) {
      const decodedParam = categoryParam.toLowerCase();
      const targetCategory = categories.find(
        (c) =>
          c.toLowerCase() === decodedParam ||
          c.toLowerCase() === decodedParam + "s" ||
          c.toLowerCase().replace(/s$/, "") === decodedParam,
      );

      if (targetCategory) {
        lastScrolledCategoryRef.current = categoryParam;

        let attempts = 0;
        const scrollInterval = setInterval(() => {
          const element = categoryRefs.current[targetCategory];
          if (element) {
            setActiveCategory(targetCategory);
            const y =
              element.getBoundingClientRect().top + window.scrollY - 180;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
          attempts++;
          // Clear interval after 4 attempts (approx 1.6 seconds)
          if (attempts >= 4) {
            clearInterval(scrollInterval);
          }
        }, 400);

        return () => clearInterval(scrollInterval);
      }
    }
  }, [categoryParam, loading, menuData]);

  // Scroll tabs
  const scrollTabs = (direction) => {
    if (tabsRef.current) {
      const scrollAmount = 300;
      tabsRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Intersection Observer for active tab
  useEffect(() => {
    if (loading || menuData.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveCategory(entry.target.getAttribute("data-category"));
        }
      });
    }, observerOptions);

    categories.forEach((category) => {
      const element = categoryRefs.current[category];
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [loading, menuData]);

  // Calculate totals
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 pb-20">
        <Image
          src="/Pizza-Loading.gif"
          width={250}
          height={250}
          alt="Loading Menu..."
          className="w-40 sm:w-56 h-auto object-contain mix-blend-multiply"
          priority
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      {/* Category Navigation Tabs - Carousel Style */}
      <div
        id="carousel2"
        className="sticky top-20 z-6 bg-white border-b border-gray-200 shadow-sm max-lg:top-44"
      >
        <div className="max-w-full mx-auto relative flex items-center px-4">
          {/* Left Scroll Arrow - Circular */}

          <button
            onClick={() => scrollTabs("left")}
            className="absolute left-2 w-10 h-10 rounded-full border-2 text-orange-400  border-orange-400 flex items-center justify-center bg-white hover:bg-orange-400 hover:text-white cursor-pointer"
          >
            <span className="text-2xl leading-none">&lt;</span>
          </button>

          {/* Tabs Container */}
          <div
            id="carosal1"
            ref={tabsRef}
            className="bg-gray-100 flex gap-4 overflow-x-auto scrollbar-hide px-12 py-4 flex-1"
          >
            {categories.map((category) => (
              <button
                key={category}
                ref={(el) => (tabRefs.current[category] = el)}
                onClick={() => handleCategoryClick(category)}
                className={`whitespace-nowrap cursor-pointer transition-all px-6 py-4 duration-300 font-bold text-lg rounded-lg ${
                  activeCategory === category
                    ? "bg-yellow-300 text-black shadow-md"
                    : "bg-white text-gray-800 hover:text-gray-900"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Right Scroll Arrow - Circular */}

          <button
            onClick={() => scrollTabs("right")}
            className="absolute right-2 z-20 w-10 h-10 rounded-full border-2 text-orange-400 border-orange-400 flex items-center justify-center bg-white hover:bg-orange-400 hover:text-white cursor-pointer transition-colors"
          >
            <span className="text-2xl leading-none">&gt;</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-4">
          {/* Left: Menu Items */}
          <div className="lg:max-w-[70%] w-full">
            <div id="SearchCards" className="hidden flex flex-col">
              <p id="TotalFound" className="text-orange-500 text-sm mb-6">
                Loading
              </p>
              <div className="flex gap-2 flex-wrap items-stretch">
                {menuData.map((item) => (
                  <Menu key={item._id} item={item} />
                ))}
              </div>
            </div>

            <div id="Cards">
              {categories.map((category) => (
                <div
                  id={category.replace(/\s+/g, "-").toLowerCase()}
                  className="mt-7 scroll-mt-[200px]"
                  key={category}
                  ref={(el) => (categoryRefs.current[category] = el)}
                  data-category={category}
                >
                  {/* Category Title */}
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    {category}
                  </h2>

                  {/* Products Grid */}
                  <div className="flex flex-wrap gap-2 max-lg:justify-center items-stretch">
                    {menuData
                      .filter((item) => item.category === category)
                      .map((item) => (
                        <Menu key={item._id} item={item} />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Cart Sidebar (Desktop Only) */}
          <div className="hidden lg:block">
            {cart.length === 0 ? (
              <div className="fixed top-50 w-xs h-80 bg-gray-50 rounded-lg p-6 mr-70 ">
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
                  <button className="cursor-pointer w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg transition opacity-0">
                    CHECKOUT
                  </button>
                </Link>
              </div>
            ) : (
              <div className="fixed top-50 w-xs h-80 bg-gray-50 rounded-xl p-4 mr-70 flex flex-col">
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
                                onClick={() => dispatch(decreaseQty(item.id))}
                                className={`cursor-pointer w-6 h-6 rounded-full ${item.qty === 1 ? "bg-red-500" : "bg-[#ffcc00]"} flex items-center justify-center transition-colors`}
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

      {/* Mobile Cart Footer */}
      {cart.length > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-yellow-400 border-t-4 border-yellow-500 p-4 z-40">
          <div className="flex justify-between items-center">
            <span className="font-bold text-black">
              {cartItemCount} items | Rs. {cartTotal}
            </span>
            <button className="cursor-pointer bg-black text-yellow-400 font-bold px-6 py-2 rounded-lg">
              CHECKOUT
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function MenuPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading Menu...
        </div>
      }
    >
      <MenuContent />
    </Suspense>
  );
}
