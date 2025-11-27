import MyJourney from "@/components/MyJourney";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const page = async () => {
  const user: any = await currentUser();
  const image: any = user?.imageUrl;
  const fullName: any = user?.firstName;
  const email: any = user?.emailAddresses[0].emailAddress;
  console.log(email);
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <main>
      <MyJourney profile={image} name={fullName} email={email} />
    </main>
  );
};

export default page;
