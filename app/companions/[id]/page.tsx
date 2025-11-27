import CompanionComponent from "@/components/CompanionComponent";
import { getCompanion } from "@/lib/actions/companion.actions";
import { currentUser } from "@clerk/nextjs/server";

export const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const companion: any = await getCompanion(id);
  const user = await currentUser();

  console.log(companion);
  const { name, subject, topic, style, duration } = companion[0];

  const image: any = user?.imageUrl;
  const username: any = user?.username || user?.fullName;

  return (
    <CompanionComponent
      {...companion[0]}
      companionId={id}
      username={username}
      image={image}
    />
  );
};
export default page;
