"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav>
      <ul className="flex gap-6 justify-center items-center mt-2">
        <li>
          <Link
            className={pathname === "/" ? "text-blue-500" : "text-gray-500"}
            href="/"
          >
            Read
          </Link>
        </li>
        <li>
          <Link
            className={
              pathname === "/create" ? "text-blue-500" : "text-gray-500"
            }
            href="/create"
          >
            Create
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
