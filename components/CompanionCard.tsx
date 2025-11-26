"use client";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Bookmark, Clock9 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  deleteCompanion,
  getAllCompanions,
} from "@/lib/actions/companion.actions";
import { useEffect } from "react";

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
    <div
      className={` flex flex-col rounded-4xl border border-black px-4 py-4 gap-5 w-full lg:max-w-[410px] justify-between;`}
      style={{ backgroundColor: color }}
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
  );
};

export default CompanionCard;
