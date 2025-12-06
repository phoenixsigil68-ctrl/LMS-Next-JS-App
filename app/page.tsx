import CompanionCard from "@/components/CompanionCard";
import CustomCompanion from "@/components/CustomCompanion";
import Navbar from "@/components/Navbar";
import RecentCompanion from "@/components/RecentCompanion";
import {
  getAllCompanions,
  getRecentSessions,
} from "@/lib/actions/companion.actions";
import React from "react";

const page = async () => {
  const companions: any = await getAllCompanions(3);
  const recentSessions: any = await getRecentSessions(Infinity);

  return (
    <main className="px-2 pb-7">
      <section className="px-2">
        <h1 className="text-3xl underline font-bold text-black max-sm:text-center">
          Dashboard
        </h1>
        <div
          className={`items-center mt-10 p-0 grid max-lg:grid-cols-2 max-md:grid-cols-1 gap-4 w-full max-md:justify-center justify-between max-sm:grid-cols-1 ${
            companions.length === 0
              ? "grid-cols-1 grid-rows-1"
              : "grid-cols-3 grid-rows-1 "
          }`}
        >
          {companions.map((item: any) => (
            <CompanionCard
              key={item.id}
              id={item.id}
              subject={item.subject}
              name={item.name}
              topic={item.topic}
              duration={item.duration}
              color={item.style}
            />
          ))}

          {companions.length === 0 && (
            <div className="text-4xl stack-sans-text text-start">
              You haven't companions yet. Create one from below.
            </div>
          )}
        </div>
      </section>
      <section className="mt-15 grid grid-cols-[65%_1fr] gap-x-10 grid-rows-1 max-lg:grid-cols-1 max-lg:grid-rows-2 max-md:grid-cols-1 max-md:grid-rows-2 max-sm:grid-cols-1 gap-y-10 max-sm:grid-rows-2">
        <div className="w-full border border-black rounded-4xl px-7 py-6">
          <h1 className="stack-sans-text text-3xl font-bold ">
            Recently Completed Lessons
          </h1>
          <RecentCompanion recentSessions={recentSessions} />
        </div>
        <CustomCompanion />
      </section>
    </main>
  );
};

export default page;
