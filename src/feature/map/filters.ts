import { BeerLocation } from "@common/types/beer-location";
import { District } from "@common/types/district";

export type Filters = Pick<
	BeerLocation,
	"afternoonSun" | "outdoorSeating" | "price"
> & { districts: District[] };

export type FilterKey = keyof Filters;
