import MyJourney from "@/components/MyJourney";
import RecentCompanion from "@/components/RecentCompanion";
import {
  getAllCompanions,
  getRecentSessions,
  getSessionHistory,
} from "@/lib/actions/companion.actions";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const page = async () => {
  const user: any = await currentUser();
  const image: any = user?.imageUrl;
  const fullName: any = user?.firstName;
  const email: any = user?.emailAddresses[0].emailAddress;
  console.log(email);
  const { userId } = await auth();
  const companions = await getAllCompanions(Infinity);
  const recentCompanions = await getRecentSessions(Infinity);

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <main className="grid grid-cols-1 grid-rows-2 gap-y-5 px-10">
      <MyJourney
        profile={image}
        name={fullName}
        email={email}
        companionsCreated={companions?.length}
      />
      <RecentCompanion recentSessions={recentCompanions} />
    </main>
  );
};

export default page;
