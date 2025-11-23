import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

const CustomCompanion = () => {
  return (
    <div className="flex h-auto flex-col items-center justify-between p-5 bg-[#2C2C2C] rounded-4xl gap-4">
      <div className="flex flex-col justify-center items-center gap-4">
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
      </div>
      <div className="flex">
        <Image
          src={"/icon.png"}
          alt="icons"
          width={48}
          height={48}
          className="top-1 relative left-20 z-2"
        />
        <Image
          src={"/icon.png"}
          alt="icons"
          width={48}
          height={48}
          style={{ position: "absolute" }}
        />
        <Image
          src={"/icon.png"}
          alt="icons"
          width={48}
          height={48}
          style={{ position: "absolute" }}
        />
        <Image
          src={"/icon.png"}
          alt="icons"
          width={48}
          height={48}
          style={{ position: "absolute" }}
        />
        <Image
          src={"/icon.png"}
          alt="icons"
          width={48}
          height={48}
          style={{ position: "absolute" }}
        />
        <Image
          src={"/icon.png"}
          alt="icons"
          width={48}
          height={48}
          style={{ position: "absolute" }}
        />
      </div>
    </div>
  );
};

export default CustomCompanion;
