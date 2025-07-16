import { createFileRoute } from "@tanstack/react-router";

import Login from "@feature/auth";

export const Route = createFileRoute("/login")({
	component: Login,
});
