import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { getSessionHistory } from "@/lib/actions/companion.actions";

const MyJourney = async ({ profile, name, email, companionsCreated }: any) => {
  const sessionHistory = await getSessionHistory();

  return (
    <div className="grid grid-cols-1 grid-rows-1 gap-y-10">
      <div className="w-full flex justify-between h-full items-center max-lg:justify-center">
        <div className="flex justify-center items-center gap-5 px-8 py-5 max-lg:hidden ">
          <Image
            src={profile}
            alt="profile img"
            width={150}
            height={100}
            className="rounded-2xl"
          />
          <div className="flex justify-center items-start flex-col gap-5">
            <h1 className="stack-sans-text text-3xl">{name}</h1>
            <h1 className="stack-sans-text text-xl text-gray-700">{email}</h1>
          </div>
        </div>
        <div className="flex justify-center items-center gap-5 max-lg:justify-between max-lg:w-full max-sm:flex-col ">
          <div className="flex flex-col justify-center items-center border p-5 h-full border-black rounded-2xl">
            <p className="text-2xl font-bold stack-sans-text">
              {sessionHistory.length}
            </p>
            <p className="text-2xl font-bold stack-sans-text">
              Lessons Completed
            </p>
          </div>
          <div className="flex flex-col justify-center items-center border p-5 h-full border-black rounded-2xl">
            <p className="text-2xl font-bold stack-sans-text">
              {companionsCreated}
            </p>
            <p className="text-2xl font-bold stack-sans-text">
              Companions Created
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyJourney;
