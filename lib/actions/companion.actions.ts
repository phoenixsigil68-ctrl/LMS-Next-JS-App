"use server";

import { createSupabaseClient } from "@/supabase-client";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export default async function createCompanion(formdata: any) {
  const { userId: author } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("companions")
    .insert({ ...formdata, author })
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
}

export const getAllCompanions = async () => {
  const { userId } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase.from("companions").select();

  if (error) {
    alert("Error happened while fetching the companion");
    console.log(error.message);
  }
  return data;
};

export const getCompanion = async (id: string) => {
  const { userId } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("companions")
    .select()
    .eq("id", id);

  if (error) {
    console.log(error.message);
  }

  return data;
};

export const deleteCompanion = async (id: string) => {
  const { userId } = await auth();
  const supabase = createSupabaseClient();
  await supabase.from("companions").delete().eq("id", id);
  revalidatePath("/companions");
  revalidatePath("/");

  console.log("Successfully deleted the companion");
};
