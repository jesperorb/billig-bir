/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useQuery } from "@tanstack/react-query";

import type { BeerLocation } from "@common/types/beer-location";
import type { District } from "@common/types/district";

export const commonBaseQueryKeys = {
	getDistricts: "getDistricts",
	getBeerLocations: "getBeerLocations",
} as const;

export const commonQueryKeys = {
	getDistricts: [commonBaseQueryKeys.getDistricts],
	getBeerLocations: [commonBaseQueryKeys.getBeerLocations],
};

export const getDistricts = async (): Promise<District[]> => {
	const response = await fetch("/api/districts");
	if (response.ok) {
		return response.json();
	}
	return [];
};

export const getBeerLocationsSelectQuery = (
	type: "default" | "submission" = "default",
) => `
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
	),
	awTimes:aw_time${type === "default" ? "" : "_submission"}(
		weekday,
		startTime:start_time,
		endTime:end_time,
		sameTimesAllWeek:same_times_all_week,
		id
	)
`;

export const getLocations = async (): Promise<BeerLocation[]> => {
	const response = await fetch("/api/locations");
	if (response.ok) {
		return response.json();
	}
	return [];
};

export const useBeerLocations = () => {
	return useQuery({
		queryKey: commonQueryKeys.getBeerLocations,
		queryFn: getLocations,
		staleTime: 10 * 60 * 1000,
	});
};

export const useDistricts = () => {
	return useQuery({
		queryKey: commonQueryKeys.getDistricts,
		queryFn: getDistricts,
		staleTime: 10 * 60 * 1000,
	});
};
