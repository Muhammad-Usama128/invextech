import React from "react";
import Image from "next/image";
import Link from "next/link";
const MenuCard = ({ image, name }) => {
  return (
    <Link
      href={`/menu?category=${encodeURIComponent(name)}#${name.replace(/\s+/g, '-').toLowerCase()}`}
      className="w-58 border flex-none border-orange-400 rounded-lg overflow-hidden mt-4 px-4 snap-start"
    >
      <Image
        src={image}
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-40"
        alt={name}
      />
      <p className="text-sm font-bold mb-2 text-center">{name}</p>
    </Link>
  );
};

export default MenuCard;
