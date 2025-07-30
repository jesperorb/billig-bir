import type {
	AWStartAndEndTimes,
	BeerLocation,
} from "@common/types/beer-location";

export interface AWStartAndEndTimesFormData extends AWStartAndEndTimes {
	fieldId?: string;
}

export interface BeerLocationFormData extends Omit<BeerLocation, "awTimes"> {
	awTimes?: AWStartAndEndTimesFormData[];
	districtIds?: string[];
}
