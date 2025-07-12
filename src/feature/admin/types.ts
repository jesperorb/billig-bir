import type { AWStartAndEndTimes, BeerLocation } from "@common/types/beerLocation";

export interface AWStartAndEndTimesFormData extends AWStartAndEndTimes {
	fieldId?: string;
}

export interface BeerLocationFormData extends Omit<BeerLocation, "awTimes"> {
	awTimes?: AWStartAndEndTimesFormData[]
}
