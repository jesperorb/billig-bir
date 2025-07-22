import type { BeerLocation } from "@common/types/beer-location";
import type { PriceType } from "@common/types/common";
import { getPriceForType } from "@common/utils/beer-location";

export const getPrice = (location: BeerLocation) => location.price;

export const getCheapestLocation =
	(priceType: PriceType) =>
	(locations: BeerLocation[]): BeerLocation | undefined =>
		locations.reduce(
			(minLocation, location) =>
				getPriceForType(priceType)(location) <
				getPriceForType(priceType)(minLocation)
					? location
					: minLocation,
			locations[0],
		);

export const priceStepsMarks: { value: number; label: number }[] = [
	{ value: 0, label: 0 },
	{ value: 50, label: 50 },
	{ value: 120, label: 120 },
];

export const priceStepsMarkMax =
	priceStepsMarks[priceStepsMarks.length - 1].value;
