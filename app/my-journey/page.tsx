import MyJourney from "@/components/MyJourney";
import { currentUser } from "@clerk/nextjs/server";

const page = async () => {
  const user: any = await currentUser();
  const image: any = user?.imageUrl;
  const fullName: any = user?.firstName;
  const email: any = user?.emailAddresses[0].emailAddress;
  console.log(email);

  return (
    <main>
      <MyJourney profile={image} name={fullName} email={email} />
    </main>
  );
};

export default page;
