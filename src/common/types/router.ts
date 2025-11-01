import type { QueryClient } from "@tanstack/react-query";

export interface RouterContext {
	isAuthenticated: boolean;
	queryClient: QueryClient;
}
