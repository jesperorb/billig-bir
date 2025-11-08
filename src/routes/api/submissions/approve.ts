import { createFileRoute } from "@tanstack/react-router";

import { getSupabaseServerClient } from "@common/api/api-client";
import type { BeerLocationFormData } from "@common/types/beer-location-form-data";
import { approveBeerLocationSubmission } from "@feature/submissions/queries";

export const Route = createFileRoute("/api/submissions/approve")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				const supabase = getSupabaseServerClient();
				const body = (await request.json()) as BeerLocationFormData;

				try {
					await approveBeerLocationSubmission(supabase)(body);
					return new Response(JSON.stringify({ success: true }), {
						status: 201,
						headers: {
							"Content-Type": "application/json",
						},
					});
				} catch (error) {
					return new Response(
						JSON.stringify({
							error:
								error instanceof Error
									? error.message
									: "Failed to approve submission",
						}),
						{
							status: 500,
							headers: {
								"Content-Type": "application/json",
							},
						},
					);
				}
			},
		},
	},
});
