import { createFileRoute } from "@tanstack/react-router";

import { getSupabaseServerClient } from "@common/api/api-client";
import type { BeerLocationFormData } from "@common/types/beer-location-form-data";
import {
	createBeerLocation,
	deleteBeerLocation,
	updateBeerLocation,
} from "@feature/admin/queries";

export const Route = createFileRoute("/api/admin/locations")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				const supabase = getSupabaseServerClient();
				const body = (await request.json()) as BeerLocationFormData;

				try {
					await createBeerLocation(supabase)(body);
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
									: "Failed to create location",
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
			PUT: async ({ request }) => {
				const supabase = getSupabaseServerClient();
				const body = (await request.json()) as BeerLocationFormData;

				try {
					await updateBeerLocation(supabase)(body);
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
									: "Failed to update location",
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
					await deleteBeerLocation(supabase)(body);
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
									: "Failed to delete location",
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
