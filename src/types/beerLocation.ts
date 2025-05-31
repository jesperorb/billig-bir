export interface AWStartAndEndTimes {
	/**
	 * @format HH:mm
	 */
	start: `${number}:${number}`;
	/**
	 * @format HH:mm
	 */
	end: `${number}:${number}`;
}

export interface AWStartAndEndTimesForWeekdays {
	monday?: AWStartAndEndTimes;
	tuesday?: AWStartAndEndTimes;
	wednesday?: AWStartAndEndTimes;
	thursday?: AWStartAndEndTimes;
	friday?: AWStartAndEndTimes;
}

export interface AWDetailsWithSameHours {
	time: AWStartAndEndTimes;
	times?: never;
}

export interface AWDetailsWithDifferentHours {
	time?: never;
	times: AWStartAndEndTimesForWeekdays;
}

export type ConditionalAWDetails =
	| AWDetailsWithSameHours
	| AWDetailsWithDifferentHours;

export type AWDetails = ConditionalAWDetails;

export interface BeerLocation {
	name: string;
	latitude: number;
	longitude: number;
	price: number;
	pricePitcher?: number;
	priceAW?: number;
	AWDetails?: AWDetails;
	outdoorSeating: boolean;
	afternoonSun: boolean;
	beerBrand: string;
	centiliters: number;
	updated: `${number}-${number}-${number}`;
	mapsUrl?: string;
	websiteUrl?: string;
}
