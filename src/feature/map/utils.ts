import { type BeerLocation } from "@common/types/beerLocation";
import { type PriceType } from "@feature/map/filters";

export const getPriceAdjustedFor40cl = (price: number, centiliters: number) =>
	Number((price / centiliters) * 40);

export const getStandardAdjustedPrice = (location: BeerLocation) =>
	location.centilitersStandard === 40
		? location.price
		: Math.floor(getPriceAdjustedFor40cl(location.price, location.centilitersStandard));

export const getPriceBySelectedPriceType =
	(priceType: PriceType) => (location: BeerLocation) =>
		priceType === "price"
			? getStandardAdjustedPrice(location)
			: location[priceType];

export const getPrice = (location: BeerLocation) => location.price;

export const getCheapestLocation = (locations: BeerLocation[]): BeerLocation | undefined =>
	locations.reduce(
		(minLocation, location) =>
			getStandardAdjustedPrice(location) < getStandardAdjustedPrice(minLocation)
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
