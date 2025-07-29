import { createFileRoute } from "@tanstack/react-router";

import ViewBeerLocationSubmissions from "@feature/admin/pages/view-beer-location-submissions";

export const Route = createFileRoute("/admin/view-beer-location-submissions")({
	component: ViewBeerLocationSubmissions,
});
