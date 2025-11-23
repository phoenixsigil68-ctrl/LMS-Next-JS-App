import React from "react";

export const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <div className="text-black text-2xl font-bold text-center">
      This page is for Id : {id}
    </div>
  );
};
export default page;
