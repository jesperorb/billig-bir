export interface AWStartAndEndTimes {
	/**
	 * @format HH:mm:ss
	 */
	startTime: `${number}:${number}`;
	/**
	 * @format HH:mm:ss
	 */
	endTime: `${number}:${number}`;
	weekday: number;
	sameTimesAllWeek?: boolean;
}

export interface BeerLocation {
	name: string;
	latitude: number;
	longitude: number;
	price: number;
	pricePitcher?: number;
	priceAW?: number;
	awTimes?: AWStartAndEndTimes[];
	outdoorSeating: boolean;
	afternoonSun: boolean;
	beerBrand: string;
	centilitersStandard: number;
	centilitersPitcher?: number;
	urlMaps?: string;
	urlWebsite?: string;
}
