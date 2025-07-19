import { createFileRoute } from "@tanstack/react-router";

import Landing from "@feature/landing";

export const Route = createFileRoute("/")({
	component: Landing,
});
