import { createFileRoute } from "@tanstack/react-router";

import AdminPage from "@feature/admin";

export const Route = createFileRoute("/admin")({
	component: AdminPage,
});
