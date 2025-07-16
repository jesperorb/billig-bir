import { SupabaseClient } from "@supabase/supabase-js";
import { createContext, use } from "react";

import { type Database } from "@common/api/types";

export const ApiClientContext = createContext<SupabaseClient<Database>>(
	undefined as unknown as SupabaseClient<Database>,
);

export const useApiClient = () => use(ApiClientContext);
