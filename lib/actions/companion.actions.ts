"use server";

import { createSupabaseClient } from "@/supabase-client";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export default async function createCompanion(formdata: any) {
  const { userId: author } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("companions")
    .insert({ ...formdata, author })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
}

export const getAllCompanions = async (limit: number) => {
  const { userId } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("companions")
    .select("*")
    .limit(limit)
    .order("created_at", { ascending: false })
    .eq("author", userId);

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

export const addCompletedSessions = async (id: string) => {
  const { userId } = await auth();
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("session_history")
    .insert({ companion_id: id, user_id: userId });

  if (error) throw new Error(error.message);
  return data;
};

export const getRecentSessions = async (limit: number) => {
  const { userId } = await auth();
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("session_history")
    .select(`companions:companion_id (*)`)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return data.map(({ companions }) => companions);
};

export const getSessionHistory = async () => {
  const { userId } = await auth();
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("session_history")
    .select("*")
    .eq("user_id", userId);
  if (error) throw new Error(error.message);
  return data;
};

export const newCompanionPermissions = async () => {
  const { userId, has } = await auth();
  const supabase = createSupabaseClient();

  let limit = 0;

  if (has({ plan: "pro" })) {
    return true;
  } else if (has({ feature: "3_companion_limit" })) {
    limit = 3;
  } else if (has({ feature: "10_companion_limit" })) {
    limit = 10;
  }

  const { data, error } = await supabase
    .from("companions")
    .select("id", { count: "exact" })
    .eq("author", userId);

  if (error) throw new Error(error.message);

  const companionCount = data?.length;

  if (companionCount >= limit) {
    return false;
  } else {
    return true;
  }
};
