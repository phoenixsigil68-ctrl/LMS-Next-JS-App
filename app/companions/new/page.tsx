import ProfileForm from "@/components/CompanionForm";
import { Button } from "@/components/ui/button";
import { newCompanionPermissions } from "@/lib/actions/companion.actions";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const page = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in?redirect_url=/companions/new");
  }

  const canCreateCompanions = await newCompanionPermissions();

  return (
    <main className="min-h-screen w-full ">
      {canCreateCompanions ? (
        <ProfileForm />
      ) : (
        <article className="w-full h-dvh flex-col gap-3 flex justify-center items-center">
          <Image
            src={"/images/illustration.png"}
            alt="limit photo"
            width={360}
            height={230}
          />
          <div className="text-3xl font-bold">Upgrade the plan</div>
          <Link href={"/subscription"}>
            <Button className="w-full p-5">Upgrade Plan</Button>
          </Link>
        </article>
      )}
    </main>
  );
};

export default page;
