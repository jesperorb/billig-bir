import { createFileRoute } from "@tanstack/react-router";

import AdminOverview from "@feature/admin/pages/overview";

export const Route = createFileRoute("/admin/")({
	component: AdminOverview,
});
