import { createFileRoute } from "@tanstack/react-router";

import ViewBeerLocationsTable from "@feature/table";

export const Route = createFileRoute("/table")({
	component: ViewBeerLocationsTable,
});
