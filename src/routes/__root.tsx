import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

import AppWrapper from "@common/components/app-wrapper";
import Layout from "@common/components/layout";
import { RouterContext } from "@common/types/router";

export const Route = createRootRouteWithContext<RouterContext>()({
	component: () => (
		<AppWrapper>
			<Layout>
				<Outlet />
			</Layout>
		</AppWrapper>
	),
});
