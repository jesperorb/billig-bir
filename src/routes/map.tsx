import { createFileRoute } from "@tanstack/react-router";

import Map from "@feature/map";

export const Route = createFileRoute("/map")({
	component: Map,
});
