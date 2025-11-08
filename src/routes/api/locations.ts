import { createFileRoute } from "@tanstack/react-router";

import { getSupabaseServerClient } from "@common/api/api-client";

export const Route = createFileRoute("/api/locations")({
	server: {
		handlers: {
			GET: async () => {
				const supabase = getSupabaseServerClient();

				const { data, error } = await supabase.from("location").select(`
					id,
					name,
					latitude,
					longitude,
					outdoorSeating:outdoor_seating,
					afternoonSun:afternoon_sun,
					urlMaps:url_maps,
					urlWebsite:url_website,
					price:price_standard,
					priceAW:price_aw,
					pricePitcher:price_pitcher,
					centilitersStandard:centiliters_standard,
					centilitersPitcher:centiliters_pitcher,
					beerBrand:beer_brand,
					updatedAt:updated_at,
					districts:district(
						id,
						name
					),
					awTimes:aw_time(
						weekday,
						startTime:start_time,
						endTime:end_time,
						sameTimesAllWeek:same_times_all_week,
						id
					)
				`);

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
