import type { AWStartAndEndTimesFormData, BeerLocationFormData } from "./types";

export const DEFAULT_FORM_VALUES: BeerLocationFormData = {
	name: "",
	latitude: 59.3307648940387,
	longitude: 18.0593531415575,
	price: 79,
	pricePitcher: undefined,
	priceAW: undefined,
	awTimes: [],
	outdoorSeating: false,
	afternoonSun: false,
	beerBrand: "",
	centilitersStandard: 40,
	centilitersPitcher: undefined,
	urlMaps: "",
	urlWebsite: "",
};

export const DEFAULT_AW_TIME_VALUE: AWStartAndEndTimesFormData = {
	id: crypto.randomUUID(),
	startTime: "16:00" as const,
	endTime: "18:00" as const,
	weekday: 0,
	sameTimesAllWeek: false,
};
