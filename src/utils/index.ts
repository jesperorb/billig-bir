import { BeerLocation } from "../types/beerLocation";

export const getPriceAdjustedFor40cl = (price: number, centiliters: number) =>
	Number((price / centiliters) * 40);

export const getStandardAWAdjustedPrice = (location: BeerLocation) =>
	location.centiliters === 40
		? location.price
		: Math.floor(getPriceAdjustedFor40cl(location.price, location.centiliters));

export const getPrice = (location: BeerLocation) => location.price;

export const getPriceMax = (locations: BeerLocation[]) =>
	Math.max(...locations.map(getStandardAWAdjustedPrice));

export const getPriceMin = (locations: BeerLocation[]) =>
	Math.min(...locations.map(getStandardAWAdjustedPrice));

export const getPriceSteps = (locations: BeerLocation[]) =>
	Array.from(new Set(locations.map(getStandardAWAdjustedPrice))).sort(
		(a, b) => a - b,
	);

export const getCheapestLocation = (locations: BeerLocation[]) =>
	locations.reduce(
		(minLocation, location) =>
			getStandardAWAdjustedPrice(location) <
			getStandardAWAdjustedPrice(minLocation)
				? location
				: minLocation,
		locations[0],
	);
