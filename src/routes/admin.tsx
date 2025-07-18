import { createFileRoute, Outlet } from "@tanstack/react-router";

import ApiClientWrapper from "@common/api/api-client-wrapper";
import { AdminNavigation } from "@feature/admin/navigation";

export const Route = createFileRoute("/admin")({
	component: () => (
		<ApiClientWrapper>
			<AdminNavigation />
			<Outlet />
		</ApiClientWrapper>
	),
});
