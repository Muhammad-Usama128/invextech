import Link from "next/link";

const Navbar = () => {
  return (
    <header className="border-b-2">
      <nav>
        <ul className="flex gap-11 py-3.5 justify-center items-center">
          <li>
            <Link href={"/"} replace className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link href={"/blogs"} className="hover:underline">
              Blogs
            </Link>
          </li>
          <li>
            <Link href={"/contact"} className="hover:underline">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
