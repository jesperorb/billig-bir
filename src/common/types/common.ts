import { BeerLocation } from "./beer-location";

export type LooseAutocomplete<T extends string> = T | (string & {});

export type PriceType = keyof Pick<
	BeerLocation,
	"price" | "priceAW" | "pricePitcher"
>;
