"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <header className="my-2">
      <nav>
        <ul className="flex gap-2 justify-center items-center my-2">
          <li>
            <Link
              className={
                pathname === "/"
                  ? "px-4 py-2 bg-amber-400 rounded-lg outline-none"
                  : "px-4 py-2 hover:bg-gray-900 rounded-lg outline-none"
              }
              href={"/"}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className={
                pathname === "/about"
                  ? "px-4 py-2 bg-amber-400 rounded-lg outline-none"
                  : "px-4 py-2 hover:bg-gray-900 rounded-lg outline-none"
              }
              href={"/about"}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              className={
                pathname.includes("/product")
                  ? "px-4 py-2 bg-amber-400 rounded-lg outline-none"
                  : "px-4 py-2 hover:bg-gray-900 rounded-lg outline-none"
              }
              href={"/product/mobile"}
            >
              Product
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
