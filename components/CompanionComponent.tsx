"use client";

import { Button } from "@/components/ui/button";
import { vapi } from "@/vapi.sdk";
import Image from "next/image";
import { useEffect, useState } from "react";

const CompanionComponent = ({
  companionId,
  username,
  image,
  subject,
  name,
  topic,
  duration,
  style,
  voice,
}: any) => {
  enum CallStatus {
    INACTIVE = "INACTIVE",
    CONNECTING = "CONNECTING",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED",
  }

  const [callStatus, setCallstatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const onCallStart = () => setCallstatus(CallStatus.ACTIVE);

    const onCallEnd = () => setCallstatus(CallStatus.FINISHED);
    const onMessage = () => {};
    const onError = (error: Error) => {
      console.log(error);
    };
    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("error", onError);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("error", onError);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
    };
  }, []);

  return (
    <div className="w-full px-10 h-full min-sm:grid-mobile-layout grid-for-voice stack-sans-text">
      <div
        style={{ gridArea: "box-1" }}
        className="w-full flex justify-between items-start max-sm:items-center gap-5 border-2 border-black rounded-2xl px-5 py-3"
      >
        <div className="flex justify-center gap-6 items-center">
          <Image
            src={`/images/${subject}.png`}
            alt="subject image"
            height={70}
            width={70}
            className="max-sm:hidden"
          />
          <div className="flex justify-start gap-5">
            <div>
              <h1 className="text-3xl text-left">{name}</h1>
              <p className="text-2xl text-left ">{topic}</p>
            </div>
            <Button className="rounded-full text-lg capitalize">
              {subject}
            </Button>
          </div>
        </div>
        <p className="text-2xl max-sm:hidden">{duration} mins</p>
      </div>
      <div
        style={{ gridArea: "box-2" }}
        className="w-full flex flex-col justify-center max-sm:items-center items-center border-4 border-black transition-all duration-300 hover:border-[#f35933] rounded-2xl"
      >
        <Image
          src={`/images/${subject}.png`}
          alt="subject image"
          width={100}
          height={100}
        />
        <h1 className="text-4xl mt-4  max-sm:text-3xl">{name}</h1>
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

export default CompanionComponent;
