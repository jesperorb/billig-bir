import {
	AWStartAndEndTimesFormData,
	BeerLocationFormData,
} from "./types/beer-location-form-data";
import { getRandomIntInclusive } from "./utils/number";

export const WEEKDAY_NAMES = {
	0: "Måndag",
	1: "Tisdag",
	2: "Onsdag",
	3: "Torsdag",
	4: "Fredag",
	5: "Lördag",
	6: "Söndag",
} as const;

export const WEEKDAY_NAMES_AS_LIST = Object.entries(WEEKDAY_NAMES).map(
	([key, value]) => ({ value: key, label: value }),
);

export const DEFAULT_LATITUDE = 59.3307648940387;
export const DEFAULT_LONGITUDE = 18.0593531415575;

export const DEFAULT_FORM_VALUES: BeerLocationFormData = {
	id: getRandomIntInclusive(),
	name: "",
	latitude: DEFAULT_LATITUDE,
	longitude: DEFAULT_LONGITUDE,
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
	districtId: undefined,
};

export const DEFAULT_AW_TIME_VALUE: AWStartAndEndTimesFormData = {
	id: getRandomIntInclusive(),
	startTime: "16:00" as const,
	endTime: "18:00" as const,
	weekday: 0,
	sameTimesAllWeek: false,
};
