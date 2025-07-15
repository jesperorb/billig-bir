import { useQuery } from "@tanstack/react-query";
import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@common/api/types";
import { useApiClient } from "@common/api/api-client-context";
import type { District } from "@common/types/district";
import type { BeerLocation } from "@common/types/beer-location";

export const commonBaseQueryKeys = {
	getDistricts: "getDistricts",
	getBeerLocations: "getBeerLocations",
} as const;

export const commonQueryKeys = {
	getDistricts: [commonBaseQueryKeys.getDistricts],
	getBeerLocations: [commonBaseQueryKeys.getBeerLocations],
};

export const getDistricts = async (apiClient: SupabaseClient<Database>) => {
	return apiClient
		.from("district")
		.select(
			`
				id,
				name,
				insideTolls:inside_tolls
			`,
		)
		.order("name")
		.overrideTypes<District[]>();
};

export const beerLocationsSelectQuery = `
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
	updatedAt: updated_at,
	districts:district(
		id,
		name
	)
	awTimes:aw_time (
		weekday,
		startTime:start_time,
		endTime:end_time,
		sameTimesAllWeek:same_times_all_week,
		id
	)
`;

export const getLocations = async (apiClient: SupabaseClient<Database>) => {
	return apiClient
		.from("location")
		.select(beerLocationsSelectQuery)
		.order("name")
		.overrideTypes<BeerLocation[]>();
};

export const useBeerLocations = () => {
	const apiClient = useApiClient();
	return useQuery({
		queryKey: commonQueryKeys.getBeerLocations,
		queryFn: () => getLocations(apiClient).then((data) => data.data),
		staleTime: 10 * 60 * 1000,
	});
};

export const useDistricts = () => {
	const apiClient = useApiClient();
	return useQuery({
		queryKey: commonQueryKeys.getDistricts,
		queryFn: () => getDistricts(apiClient).then((data) => data.data),
		staleTime: 10 * 60 * 1000,
	});
};
