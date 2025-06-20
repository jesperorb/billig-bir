import { useQuery } from "@tanstack/react-query";
import { SupabaseClient } from "@supabase/supabase-js";

import { Database } from "@common/api/types";
import { useApiClient } from "@common/api/api-client-context";
import { BeerLocation } from "@common/types/beerLocation";

const beerLocationsBaseQueryKeys = {
	get: "getBeerLocations",
} as const;

const beerLocationQueryKeys = {
	get: [beerLocationsBaseQueryKeys.get],
};

export const getLocations = async (apiClient: SupabaseClient<Database>) => {
	return apiClient
		.from("location")
		.select(
			`
				name,
				latitude,
				longitude,
				outdoorSeating:outdoor_seating,
				urlMaps:url_maps,
				urlWebsite:url_website,
				price:price_standard,
				priceAW:price_aw,
				pricePitcher:price_pitcher,
				centilitersStandard:centiliters_standard,
				centilitersPitcher:centiliters_pitcher,
				beerBrand:beer_brand,
				awTimes:aw_time(
					weekday,
					startTime:start_time,
					endTime:end_time,
					sameTimesAllWeek:same_times_all_week
				)
			`,
		)
		.overrideTypes<BeerLocation[]>()
};

export const useBeerLocations = () => {
	const apiClient = useApiClient();
	return useQuery({
		queryKey: beerLocationQueryKeys.get,
		queryFn: () => getLocations(apiClient).then(data => data.data),
		staleTime: 10 * 60 * 1000,
	});
};
