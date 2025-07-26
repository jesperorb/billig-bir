import type { ColumnSort } from "@tanstack/react-table";

import type { PriceType } from "@common/types/common";

import type { ColumnKeys } from "./types";

export const AVAILABLE_SORTABLE_PRICE_TYPES: {
	value: PriceType;
	label: string;
}[] = [
	{
		value: "price",
		label: "Standard",
	},
	{
		value: "priceAW",
		label: "AW",
	},
];

export const BEER_LOCATION_DEFAULT_VISIBLE_COLUMNS: Record<
	ColumnKeys,
	boolean
> = {
	id: false,
	name: true,
	latitude: false,
	longitude: false,
	price: true,
	pricePerCentiliter: true,
	priceAWPerCentiliter: false,
	pricePitcher: false,
	priceAW: true,
	awTimes: true,
	outdoorSeating: true,
	afternoonSun: true,
	beerBrand: true,
	centilitersStandard: true,
	centilitersPitcher: false,
	urlMaps: true,
	urlWebsite: true,
	updatedAt: false,
	districts: true,
};

export const BEER_LOCATION_DEFAULT_SORTING: ColumnSort = {
	id: "pricePerCentiliter",
	desc: false,
};

export const BEER_LOCATION_TABLE_VISIBILITY_STORAGE_KEY =
	"beer-location-table-visibility";

export const BEER_LOCATION_TABLE_SORTING_STORAGE_KEY =
	"beer-location-table-sorting";
