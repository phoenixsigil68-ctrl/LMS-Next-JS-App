import ProfileForm from "@/components/CompanionForm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const page = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in?redirect_url=/companions/new");
  }

  return (
    <div className="min-h-screen w-full ">
      <ProfileForm />
    </div>
  );
};

export default page;
