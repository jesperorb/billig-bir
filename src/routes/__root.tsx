import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

import { RouterContext } from "@common/types/router";

export const Route = createRootRouteWithContext<RouterContext>()({
	component: Outlet,
});
