import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getSupabaseSignedUrl = async (fileName: string) => {
  const { data, error } = await supabase.storage
    .from("Pets")
    .createSignedUrl(`public/${fileName}`, 60 * 60);
  return { error, data };
};

export const uploadSupabaseImage = async (file: File, fileName: string) => {
  const { data, error } = await supabase.storage
    .from("Pets")
    .upload(`public/${fileName}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  return { data, error };
};
