import {
	AWStartAndEndTimesForWeekdays,
	BeerLocation,
} from "../types/beerLocation";
import { PriceType } from "../types/filters";

export const getPriceAdjustedFor40cl = (price: number, centiliters: number) =>
	Number((price / centiliters) * 40);

export const getStandardAdjustedPrice = (location: BeerLocation) =>
	location.centiliters === 40
		? location.price
		: Math.floor(getPriceAdjustedFor40cl(location.price, location.centiliters));

export const getPriceBySelectedPriceType =
	(priceType: PriceType) => (location: BeerLocation) =>
		priceType === "price"
			? getStandardAdjustedPrice(location)
			: location[priceType];

export const getPrice = (location: BeerLocation) => location.price;

export const getCheapestLocation = (locations: BeerLocation[]) =>
	locations.reduce(
		(minLocation, location) =>
			getStandardAdjustedPrice(location) < getStandardAdjustedPrice(minLocation)
				? location
				: minLocation,
		locations[0],
	);

export const getWeekdayTranslation: Record<
	keyof AWStartAndEndTimesForWeekdays,
	string
> = {
	monday: "Måndag",
	tuesday: "Tisdag",
	wednesday: "Onsdag",
	thursday: "Torsdag",
	friday: "Fredag",
};
