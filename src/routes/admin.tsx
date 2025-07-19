import { createFileRoute, Outlet } from "@tanstack/react-router";

import ApiClientWrapper from "@common/api/api-client-wrapper";
import Layout from "@common/components/layout";
import { AdminNavigation } from "@feature/admin/navigation";

export const Route = createFileRoute("/admin")({
	component: () => (
		<ApiClientWrapper>
			<Layout>
				<AdminNavigation />
				<Outlet />
			</Layout>
		</ApiClientWrapper>
	),
});
