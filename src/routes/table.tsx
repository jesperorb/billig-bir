import { createFileRoute } from "@tanstack/react-router";

import ViewBeerLocationsTable from "@feature/table/view-beer-locations-table";

export const Route = createFileRoute("/table")({
	component: ViewBeerLocationsTable,
});
