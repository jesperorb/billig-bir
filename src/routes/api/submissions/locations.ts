import { createFileRoute } from "@tanstack/react-router";

import { getSupabaseServerClient } from "@common/api/api-client";
import type { BeerLocationFormData } from "@common/types/beer-location-form-data";
import {
	createBeerLocationSubmission,
	deleteBeerLocationSubmission,
	getBeerLocationSubmissions,
} from "@feature/submissions/queries";

export const Route = createFileRoute("/api/submissions/locations")({
	server: {
		handlers: {
			GET: async () => {
				const supabase = getSupabaseServerClient();

				try {
					const { data } = await getBeerLocationSubmissions(supabase);

					return new Response(JSON.stringify(data), {
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
									: "Failed to get beer location submissions",
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
			POST: async ({ request }) => {
				const supabase = getSupabaseServerClient();
				const body = (await request.json()) as BeerLocationFormData;

				try {
					await createBeerLocationSubmission(supabase)(body);
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
									: "Failed to create submission",
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
				const body = (await request.json()) as BeerLocationFormData;

				try {
					await deleteBeerLocationSubmission(supabase)(body);
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
									: "Failed to delete submission",
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
