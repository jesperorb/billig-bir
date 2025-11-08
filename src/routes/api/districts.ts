import { createFileRoute } from "@tanstack/react-router";

import { getSupabaseServerClient } from "@common/api/api-client";

export const Route = createFileRoute("/api/districts")({
	server: {
		handlers: {
			GET: async () => {
				const supabase = getSupabaseServerClient();

				const { data, error } = await supabase
					.from("district")
					.select("id, name, insideTolls:inside_tolls");

				if (error) {
					return new Response(JSON.stringify([]), {
						status: 500,
						headers: {
							"Content-Type": "application/json",
						},
					});
				}

				return new Response(JSON.stringify(data), {
					headers: {
						"Content-Type": "application/json",
					},
				});
			},
		},
	},
});
