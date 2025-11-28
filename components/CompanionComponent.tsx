"use client";

import { Button } from "@/components/ui/button";
import { configureAssistant } from "@/lib/utils";
import { vapi } from "@/vapi.sdk";
import Lottie from "lottie-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import soundwaves from "@/constants/soundwaves.json";
import { addCompletedSessions } from "@/lib/actions/companion.actions";

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
  const [messages, setMessages] = useState([]);
  const lottieRef: any = useRef(null);

  useEffect(() => {
    const onCallStart = () => setCallstatus(CallStatus.ACTIVE);

    const onCallEnd = () => {
      setCallstatus(CallStatus.FINISHED);
      addCompletedSessions(companionId);
    };
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

  useEffect(() => {
    if (lottieRef) {
      if (isSpeaking) {
        lottieRef.current?.play();
      } else {
        lottieRef.current?.stop();
      }
    }
  });

  const handleCall = async () => {
    setCallstatus(CallStatus.ACTIVE);

    const assistantOverrides = {
      variableValues: { subject, topic, style },
      clientMessages: ["transcript"],
      serverMessages: [],
    };
    //@ts-expect-error
    vapi.start(configureAssistant(voice, style), assistantOverrides);
  };

  const handleDisconnect = async () => {
    setCallstatus(CallStatus.FINISHED);
    vapi.stop();
  };
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
        {callStatus === CallStatus.ACTIVE ? (
          <div className="opacity-100 transition-opacity duration-700">
            <Lottie
              animationData={soundwaves}
              autoPlay={false}
              lottieRef={lottieRef}
              className="size-[300px] max-sm:size-[100px]"
            />
          </div>
        ) : (
          <div className="opacity-100 transition-opacity duration-700">
            <Image
              src={`/images/${subject}.png`}
              alt="subject image"
              width={100}
              height={100}
            />
          </div>
        )}

        <h1 className="text-4xl mt-4  max-sm:text-3xl">{name}</h1>
      </div>
      <div
        style={{ gridArea: "box-3" }}
        className="grid grid-cols-1 grid-rows-2 gap-y-10 h-full"
      >
        <div className="flex flex-col h-full gap-5 border-2 border-black rounded-2xl w-full justify-center items-center max-lg:py-10">
          <Image
            src={image}
            alt="profile"
            height={100}
            width={100}
            className="rounded-full"
          />
          <h1 className="text-4xl font-bold">{username}</h1>
        </div>
        <div className="w-full">
          <Button
            className={`w-full text-2xl py-7
          hover:cursor-pointer ${
            callStatus === CallStatus.INACTIVE ||
            callStatus === CallStatus.FINISHED
              ? ""
              : " bg-[#f35933] hover:bg-[#f54a20]"
          }`}
            onClick={
              callStatus === CallStatus.INACTIVE ? handleCall : handleDisconnect
            }
          >
            {callStatus === CallStatus.ACTIVE ? "End Session" : "Start Session"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanionComponent;
