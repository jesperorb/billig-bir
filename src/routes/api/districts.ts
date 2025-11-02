import { createFileRoute } from "@tanstack/react-router";

import { getDistricts } from "@common/api/queries";

export const Route = createFileRoute("/api/districts")({
	server: {
		handlers: {
			GET: async () => {
				const districts = await getDistricts();
				return new Response(JSON.stringify(districts));
			},
		},
	},
});
