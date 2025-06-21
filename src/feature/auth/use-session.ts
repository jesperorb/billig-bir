import { useEffect, useState } from "react";
import { type Session } from "@supabase/supabase-js";
import { useApiClient } from "@common/api/api-client-context";

export const useSession = () => {
	const apiClient = useApiClient();
	const [session, setSession] = useState<Session | null>(null);
	useEffect(() => {
		apiClient.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});
		const {
			data: { subscription },
		} = apiClient.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
		return () => subscription.unsubscribe();
	}, []);
	return session;
};
