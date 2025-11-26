import CompanionCard from "@/components/CompanionCard";
import { getCompanion } from "@/lib/actions/companion.actions";
import { Button } from "@/components/ui/button";
import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

export const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const data: any = await getCompanion(id);
  const user = await currentUser();

  const image: any = user?.imageUrl;
  const username: any = user?.username || user?.fullName;
  console.log(username);

  return (
    <div className="w-full px-10 h-full min-sm:grid-mobile-layout grid-for-voice stack-sans-text">
      <div
        style={{ gridArea: "box-1" }}
        className="w-full flex justify-between items-start max-sm:items-center gap-5 border-2 border-black rounded-2xl px-5 py-3"
      >
        <div className="flex justify-center gap-6 items-center">
          <Image
            src={`/images/${data[0].subject}.png`}
            alt="subject image"
            height={70}
            width={70}
            className="max-sm:hidden"
          />
          <div className="flex justify-start gap-5">
            <div>
              <h1 className="text-3xl text-left">{data[0].name}</h1>
              <p className="text-2xl text-left ">{data[0].topic}</p>
            </div>
            <Button className="rounded-full text-lg capitalize">
              {data[0].subject}
            </Button>
          </div>
        </div>
        <p className="text-2xl max-sm:hidden">{data[0].duration} mins</p>
      </div>
      <div
        style={{ gridArea: "box-2" }}
        className="w-full flex flex-col justify-center max-sm:items-center items-center border-4 border-black transition-all duration-300 hover:border-[#f35933] rounded-2xl"
      >
        <Image
          src={`/images/${data[0].subject}.png`}
          alt="subject image"
          width={100}
          height={100}
        />
        <h1 className="text-4xl mt-4  max-sm:text-3xl">{data[0].name}</h1>
      </div>
      <div style={{ gridArea: "box-3" }} className="grid-for-user-voice">
        <div
          style={{ gridArea: "userProfile" }}
          className="flex flex-col gap-5 border-2 border-black rounded-2xl w-full h-full justify-center items-center"
        >
          <Image
            src={image}
            alt="profile"
            height={100}
            width={100}
            className="rounded-full"
          />
          <h1 className="text-4xl font-bold">{username}</h1>
        </div>
        <Button
          style={{ gridArea: "mic" }}
          className="flex justify-center items-center border-2 border-black rounded-2xl w-full h-full bg-transparent hover:bg-gray-100 "
        >
          <Image src={"/images/mic.png"} alt="mic" width={40} height={40} />
        </Button>
        <Button
          style={{ gridArea: "repeat" }}
          className="flex justify-center items-center border-2 border-black rounded-2xl w-full h-full bg-transparent hover:bg-gray-100"
        >
          <Image
            src={"/images/repeat.png"}
            alt="repeat"
            width={40}
            height={40}
          />
        </Button>
        <div style={{ gridArea: "endSession" }} className="w-full">
          <Button
            className="w-full text-2xl py-7 bg-[#f35933] hover:bg-[#f54a20]
          hover:cursor-pointer"
          >
            End Session
          </Button>
        </div>
      </div>
    </div>
  );
};
export default page;
