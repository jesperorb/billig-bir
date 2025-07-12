import type { AWStartAndEndTimesFormData, BeerLocationFormData } from "./types";
import { getRandomIntInclusive } from "./utils";

export const TEMP_ID_PREFIX = "temp_"

export const DEFAULT_FORM_VALUES: BeerLocationFormData = {
	id: getRandomIntInclusive(),
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
	id: getRandomIntInclusive(),
	startTime: "16:00" as const,
	endTime: "18:00" as const,
	weekday: 0,
	sameTimesAllWeek: false,
};
