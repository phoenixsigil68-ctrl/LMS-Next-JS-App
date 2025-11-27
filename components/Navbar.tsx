"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useClerk, useUser, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Companions", href: "/companions" },
    { label: "My Journey", href: "/my-journey" },
  ];
  const pathname = usePathname();

  const { user } = useUser();
  const { openSignIn } = useClerk();
  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    if (menu) {
      setMenu(false);
    } else {
      setMenu(true);
    }
  };

  return (
    <div className="flex justify-between items-center border-b border-gray-400 px-8 py-4 changa-one-regular  max-sm:px-0 ">
      <div className="max-sm:hidden">
        <Link href={"/"}>
          <Image src="/logo.png" alt="logo" width={70} height={50} />
        </Link>
      </div>
      <div className="flex justify-center items-center gap-6 text-2xl max-sm:grid max-sm:grid-cols-2 max-sm:grid-rows-1 max-sm:w-full max-sm:px-5">
        <div className="max-sm:hidden flex justify-center items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={crypto.randomUUID()}
              href={item.href}
              className={cn(pathname === item.href && "text-red-400 ")}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div
          className="hidden max-sm:block max-sm:justify-self-start relative"
          onClick={handleMenu}
        >
          <Menu />
        </div>
        <div
          className={`${
            menu ? "flex opacity-100 " : "hidden opacity-0 "
          } flex-col  absolute bg-red-300 rounded-2xl w-50 h-40 top-15 justify-center items-start px-5 gap-y-3 transition-all duration-500`}
        >
          {navItems.map((item) => (
            <Link
              key={crypto.randomUUID()}
              href={item.href}
              className={cn(pathname === item.href && "text-red-400 ")}
              onClick={handleMenu}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="max-sm:justify-self-end">
          {!user ? (
            <Link href={"/sign-in"}>
              <Button>Login</Button>
            </Link>
          ) : (
            <UserButton />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
