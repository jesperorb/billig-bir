import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

import { getSupabaseClient } from "./api-client";

export const sessionBaseQueryKeys = {
	get: "getSession",
} as const;

export const sessionQueryKeys = {
	get: [sessionBaseQueryKeys.get],
} as const;

export const useSession = () => {
	const queryClient = useQueryClient();
	const apiClient = useRef(getSupabaseClient());
	const session = useQuery({
		queryKey: sessionQueryKeys.get,
		queryFn: () =>
			apiClient.current.auth
				.getSession()
				.then(({ data: { session } }) => session),
	});
	useEffect(() => {
		const {
			data: { subscription },
		} = apiClient.current.auth.onAuthStateChange((_event, session) => {
			if (session === null) {
				queryClient.invalidateQueries({
					queryKey: sessionQueryKeys.get,
				});
			} else {
				queryClient.setQueryData(sessionQueryKeys.get, session);
			}
		});
		return () => {
			subscription.unsubscribe();
		};
	}, [apiClient.current.auth, queryClient]);
	return session;
};
