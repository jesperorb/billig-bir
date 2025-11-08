import { createFileRoute } from "@tanstack/react-router";

import { getSupabaseServerClient } from "@common/api/api-client";
import type { AWStartAndEndTimesFormData } from "@common/types/beer-location-form-data";
import { createAwTime, deleteAwTime } from "@feature/admin/queries";

export const Route = createFileRoute("/api/admin/aw-times")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				const supabase = getSupabaseServerClient();
				const body = (await request.json()) as {
					value: AWStartAndEndTimesFormData;
					locationId: number;
				};

				try {
					await createAwTime(supabase)(body);
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
									: "Failed to create AW time",
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
			DELETE: async ({ request }) => {
				const supabase = getSupabaseServerClient();
				const body = (await request.json()) as AWStartAndEndTimesFormData;

				try {
					await deleteAwTime(supabase)(body);
					return new Response(JSON.stringify({ success: true }), {
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
									: "Failed to delete AW time",
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
