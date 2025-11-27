"use client";

import { Button } from "./ui/button";
import { Bookmark, Clock9 } from "lucide-react";
import { redirect } from "next/navigation";
import AnimatedContent from "./AnimatedContent";
import { deleteCompanion } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import FadeContent from "./FadeContent";

interface CompanionCardProps {
  id: string;
  subject: string;
  duration: number;
  topic: string;
  color: string;
  name: string;
}

const CompanionCard = ({
  id,
  subject,
  duration,
  topic,
  color,
  name,
}: CompanionCardProps) => {
  return (
    <FadeContent
      blur={false}
      duration={700}
      easing="ease-out"
      initialOpacity={0}
    >
      <div
        className={` flex flex-col rounded-4xl border border-black px-4 py-4 gap-5 w-full lg:max-w-[410px] justify-between;`}
        style={{ backgroundColor: getSubjectColor(subject) }}
      >
        <div className="flex justify-between items-center">
          <Button>{subject}</Button>
          <div className="flex justify-center items-center gap-5 ">
            <Button
              onClick={() => deleteCompanion(id)}
              className="bg-[#ff0800] hover:bg-[#f82720] cursor-pointer"
            >
              Delete
            </Button>
            <Button>
              <Bookmark />
            </Button>
          </div>
        </div>
        <p className="stack-sans-text font-bold text-left text-2xl ">{name}</p>
        <p className="stack-sans-text text-[#111111;]">Topic: {topic}</p>
        <div className="flex justify-start gap-2 items-center">
          <Clock9 width={18} />
          <p>{duration} mins duration</p>
        </div>
        <Button
          value={id}
          className="bg-[#FE5933] hover:bg-[#fc7050] cursor-pointer"
          onClick={(e: any) => redirect(`companions/${e.target.value}`)}
        >
          Launch Session
        </Button>
      </div>
    </FadeContent>
  );
};

export default CompanionCard;
