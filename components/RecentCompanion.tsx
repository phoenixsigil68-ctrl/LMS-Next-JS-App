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

const RecentCompanion = ({ recentSessions }: any) => {
  interface intfc {
    name: string;
    topic: string;
    subject: string;
    duration: number;
    img: string;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-auto max-sm:hidden">Lesson</TableHead>
          <TableHead className="max-sm:text-center max-sm:text-2xl stack-sans-text">
            Subject
          </TableHead>
          <TableHead className="max-sm:hidden">Duration</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="max-sm:w-fit">
        {recentSessions.map((item: any) => (
          <TableRow key={crypto.randomUUID()}>
            <TableCell className="font-medium flex justify-start items-center gap-4">
              <Image
                src={`/images/${item.subject}.png`}
                className="max-sm:hidden"
                alt="img"
                width={50}
                height={50}
              />

              <div className="flex flex-col justify-center items-start gap-2">
                <p className="stack-sans-text text-2xl">{item.name}</p>
                <p className="stack-sans-text text-gray-700 text-md">
                  {item.topic}
                </p>
              </div>
            </TableCell>
            <TableCell className="max-sm:hidden">
              <Button className="rounded-full">{item.subject}</Button>
            </TableCell>
            <TableCell className="text-xl max-sm:hidden stack-sans-text">
              {item.duration} mins
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RecentCompanion;
