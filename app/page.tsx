"use client";

import CompanionCard from "@/components/CompanionCard";
import CustomCompanion from "@/components/CustomCompanion";
import Navbar from "@/components/Navbar";
import RecentCompanion from "@/components/RecentCompanion";
import React from "react";

const page = () => {
  return (
    <main className="px-6">
      <section className="px-2">
        <h1 className="text-3xl font-bold text-black">Dashboard</h1>
        <div className="items-center mt-10 p-0 flex flex-wrap gap-4 w-full max-md:justify-center justify-between">
          <CompanionCard
            id="1"
            subject="Science"
            name="Neura the Brainy Explorer"
            topic="Neural Network of the Brain"
            duration={45}
            color="#E5D0FF"
          />
          <CompanionCard
            id="2"
            subject="Maths"
            name="Counsty the Number Wizard"
            topic="Derivatives and Integrals"
            duration={30}
            color="#FFDA6E"
          />
          <CompanionCard
            id="3"
            subject="Language"
            name="Verba the Vocabulary Builder"
            topic="English Literature"
            duration={30}
            color="#BDE7FF"
          />
        </div>
      </section>
      <section className="mt-15 grid-container">
        <div className="w-full border border-black rounded-4xl px-7 py-6">
          <h1 className="stack-sans-text text-3xl font-bold ">
            Recently Completed Lessons
          </h1>
          <RecentCompanion />
        </div>
        <CustomCompanion />
      </section>
    </main>
  );
};

export default page;
