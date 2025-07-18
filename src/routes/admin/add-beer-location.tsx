import { createFileRoute } from "@tanstack/react-router";

import AddBeerLocation from "@feature/admin/pages/add-beer-location";

export const Route = createFileRoute("/admin/add-beer-location")({
	component: AddBeerLocation,
});
