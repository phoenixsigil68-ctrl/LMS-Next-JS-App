import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

const CustomCompanion = () => {
  return (
    <div className="flex h-100 flex-col items-center justify-center p-5 bg-[#2C2C2C] rounded-4xl gap-4">
      <div className="flex flex-col justify-evenly items-center gap-4">
        <Button className="stack-sans-text rounded-md hover:bg-[#fcd256] bg-[#FCCC41] text-black">
          Start Learning Your way
        </Button>
        <p className="text-3xl font-bold stack-sans-text text-center text-white">
          Build a Personalize Learning Companion
        </p>
        <p className="text-[#F9F9F9] stack-sans-text text-center">
          Pick a name, subject, voice, & personality — and start learning
          through voice conversations that feel natural and fun.
        </p>
        <Link href={"/companions/new"}>
          <Button className="text-xl w-full bg-[#FE5933] stack-sans-text hover:bg-[#f4694a] cursor-pointer hover:scale-104 active:scale-100">
            + Build New Companion
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CustomCompanion;
