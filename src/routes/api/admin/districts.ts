import { createFileRoute } from "@tanstack/react-router";

import { getSupabaseServerClient } from "@common/api/api-client";
import type { District } from "@common/types/district";
import {
	createDistrict,
	deleteDistrict,
	updateDistrict,
} from "@feature/admin/queries";

export const Route = createFileRoute("/api/admin/districts")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				const supabase = getSupabaseServerClient();
				const body = (await request.json()) as District;

				try {
					await createDistrict(supabase)(body);
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
								error instanceof Error ? error.message : "Failed to create district",
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
				const body = (await request.json()) as District;

				try {
					await updateDistrict(supabase)(body);
					return new Response(JSON.stringify({ success: true }), {
						headers: {
							"Content-Type": "application/json",
						},
					});
				} catch (error) {
					return new Response(
						JSON.stringify({
							error:
								error instanceof Error ? error.message : "Failed to update district",
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
				const body = (await request.json()) as { id: number };

				try {
					await deleteDistrict(supabase)(body.id);
					return new Response(JSON.stringify({ success: true }), {
						headers: {
							"Content-Type": "application/json",
						},
					});
				} catch (error) {
					return new Response(
						JSON.stringify({
							error:
								error instanceof Error ? error.message : "Failed to delete district",
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
