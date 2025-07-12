import { BeerLocation } from "@common/types/beer-location";

export type Filters = Pick<
	BeerLocation,
	"afternoonSun" | "outdoorSeating" | "price"
>;

export type FilterKey = keyof Filters;

export type PriceType = keyof Pick<
	BeerLocation,
	"price" | "priceAW" | "pricePitcher"
>;
