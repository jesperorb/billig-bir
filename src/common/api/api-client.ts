import { createClient } from "@supabase/supabase-js";

import { Database } from "./types";

const client = createClient<Database>(
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_ANON_KEY,
);

export const getSupabaseClient = () => client;
