import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Brand() {
  return (
    <Link href="/" className="brand w-nav-brand w--current">
      <Image
        src='/images/blue-fish.svg'
        alt="Fish logo"
        width={200}
        height={200}
      />
    </Link>
  );
}
