import { Database } from "@jordiboard/lib";
import { createBrowserClient } from "@supabase/ssr";
import { useMemo } from "react";

export const createClient = () => {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};

export function useSupabase() {
  return useMemo(() => createClient(), []);
}
