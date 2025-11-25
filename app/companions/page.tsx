import { getAllCompanions } from "@/lib/actions/companion.actions";
import React from "react";
import CompanionCard from "@/components/CompanionCard";

const page = async () => {
  const companions: any = await getAllCompanions();

  return (
    <>
      <div className="text-3xl text-center underline stack-sans-text">
        The Companions page
      </div>
      <div className="grid-layout mt-10">
        {companions.map((item: any) => (
          <CompanionCard
            key={item.id}
            id={item.id}
            subject={item.subject}
            duration={item.duration}
            name={item.name}
            color={item.color}
            topic={item.topic}
          />
        ))}
      </div>
    </>
  );
};

export default page;
