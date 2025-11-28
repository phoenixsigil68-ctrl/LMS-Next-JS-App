import { getAllCompanions } from "@/lib/actions/companion.actions";
import React from "react";
import CompanionCard from "@/components/CompanionCard";

const page = async () => {
  const companions: any = await getAllCompanions(Infinity);

  return (
    <>
      <div className="text-3xl text-center underline stack-sans-text">
        The Companions page
      </div>
      <div
        className={`grid grid-cols-3 auto-rows-fr max-md:grid-cols-2 gap-5 max-lg:grid-cols-2 px-5 max-sm:grid-cols-1 mt-10`}
      >
        {companions.map((item: any) => (
          <CompanionCard
            key={item.id}
            id={item.id}
            subject={item.subject}
            duration={item.duration}
            name={item.name}
            color={item.style}
            topic={item.topic}
          />
        ))}
      </div>
    </>
  );
};

export default page;
