"use server";

import { createSupabaseClient } from "@/supabase-client";
import { auth } from "@clerk/nextjs/server";

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

  return data;
};
