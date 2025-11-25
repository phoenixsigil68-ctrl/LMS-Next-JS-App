"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useClerk, useUser, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

const Navbar = () => {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Companions", href: "/companions" },
    { label: "My Journey", href: "/my-journey" },
  ];
  const pathname = usePathname();

  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <div className="flex justify-between items-center px-8 py-4 changa-one-regular">
      <div>
        <Link href={"/"}>
          <Image src="/logo.png" alt="logo" width={70} height={50} />
        </Link>
      </div>
      <div className="flex justify-center items-center gap-6 text-2xl max-sm:gap-2">
        {navItems.map((item) => (
          <Link
            key={crypto.randomUUID()}
            href={item.href}
            className={cn(pathname === item.href && "text-red-400 ")}
          >
            {item.label}
          </Link>
        ))}
        {!user ? (
          <Link href={"/sign-in"}>
            <Button>Login</Button>
          </Link>
        ) : (
          <UserButton />
        )}
      </div>
    </div>
  );
};

export default Navbar;
