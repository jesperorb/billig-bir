import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";

import { getQueryClient } from "@common/api/query-client";

import { routeTree } from "./routeTree.gen";
import { DefaultCatchBoundary } from "@common/components/default-catch-boundary";
import { NotFound } from "@common/components/not-found";

export function getRouter() {
	const queryClient = getQueryClient();
	const router = createRouter({
		routeTree,
		defaultPreload: "intent",
		defaultErrorComponent: DefaultCatchBoundary,
		defaultNotFoundComponent: () => <NotFound />,
		context: {
			queryClient,
			isAuthenticated: false,
		},
	});
	setupRouterSsrQueryIntegration({
		router,
		queryClient,
	});
	return router;
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
