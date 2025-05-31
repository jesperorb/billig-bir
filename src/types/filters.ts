import { type BeerLocation } from "./beerLocation";

export type Filters = Pick<
	BeerLocation,
	"afternoonSun" | "outdoorSeating" | "price"
>;

export type FilterKey = keyof Filters;

export type PriceType = keyof Pick<
	BeerLocation,
	"price" | "priceAW" | "pricePitcher"
>;
