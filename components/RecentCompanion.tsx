"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Button } from "./ui/button";

const RecentCompanion = () => {
  interface intfc {
    name: string;
    topic: string;
    subject: string;
    duration: number;
    img: string;
  }

  const detailsCompanions = [
    {
      name: "Neura the Brainy Explorer",
      topic: "Neural Networks of the Brain",
      subject: "Science",
      duration: 45,
      img: "/science.png",
      color: "#E5D0FF",
    },
    {
      name: "Algebrin, the Eq Queen",
      topic: "Solving Linear Equations",
      subject: "Maths",
      duration: 20,
      img: "/math.png",
      color: "#FFDA6E",
    },
    {
      name: "Luna, Your Grammar Guide",
      topic: "Mastering Tenses in English",
      subject: "Language",
      duration: 32,
      img: "/chat.png",
      color: "#BDE7FF",
    },
    {
      name: "Codey, the Logic Hacker",
      topic: "Intro to If-Else Statements",
      subject: "Coding",
      duration: 30,
      img: "/coding.png",
      color: "#FFC8E4",
    },
    {
      name: "Memo, the Memory Keeper",
      topic: "World Wars: Causes & Effects",
      subject: "History",
      duration: 15,
      img: "/map.png",
      color: "#FFECC8",
    },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-auto">Lesson</TableHead>
          <TableHead>Subject</TableHead>
          <TableHead>Duration</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {detailsCompanions.map((item) => (
          <TableRow key={crypto.randomUUID()}>
            <TableCell className="font-medium flex justify-start items-center gap-4">
              <div
                className="p-4 rounded-lg"
                style={{ backgroundColor: item.color }}
              >
                <Image src={item.img} alt="img" width={30} height={30} />
              </div>
              <div className="flex flex-col justify-center items-start gap-2">
                <p className="stack-sans-text text-2xl">{item.name}</p>
                <p className="stack-sans-text text-gray-700 text-md">
                  {item.topic}
                </p>
              </div>
            </TableCell>
            <TableCell>
              <Button className="rounded-full">{item.subject}</Button>
            </TableCell>
            <TableCell className="text-xl stack-sans-text">
              {item.duration} mins
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RecentCompanion;
