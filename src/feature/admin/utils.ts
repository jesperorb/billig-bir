import type { Database } from "@common/api/types";
import type { BeerLocationFormData } from "./types";
import { AWStartAndEndTimes } from "@common/types/beerLocation";

type BeerLocationInsert = Database["public"]["Tables"]["location"]["Insert"];
type AwTimeRow = Database["public"]["Tables"]["aw_time"]["Row"];
type AwTimeInsert = Database["public"]["Tables"]["aw_time"]["Insert"];
type BeerLocationAwTimeInsert =
	Database["public"]["Tables"]["location_aw_time"]["Insert"];

export const removeEmptyStrings = (
	values: BeerLocationFormData,
): BeerLocationFormData =>
	Object.fromEntries(
		Object.entries(values).map(([key, value]) => [
			key,
			value === "" ? undefined : value,
		]),
	) as BeerLocationFormData;

export const beerLocationFormDataToSchema = (
	values: BeerLocationFormData,
): BeerLocationInsert => ({
	id: values.id >= 0 ?  values.id :undefined,
	name: values.name,
	latitude: values.latitude,
	longitude: values.longitude,
	beer_brand: values.beerBrand,
	price_standard: values.price,
	price_aw: values.priceAW,
	price_pitcher: values.pricePitcher,
	centiliters_standard: values.centilitersStandard,
	centiliters_pitcher: values.centilitersPitcher,
	outdoor_seating: values.outdoorSeating,
	afternoon_sun: values.afternoonSun,
	url_maps: values.urlMaps,
	url_website: values.urlWebsite,
});

export const awTimesFormDataToSchema = (
	awTimes: AWStartAndEndTimes[],
): AwTimeInsert[] => awTimes.map(awTimeFormDataToSchema);

export const awTimeFormDataToSchema = (time: AWStartAndEndTimes) => ({
	id: time.id > 0 ? time.id : undefined,
	weekday: time.weekday,
	same_times_all_week: time.sameTimesAllWeek,
	end_time: time.endTime,
	start_time: time.startTime,
});

export const locationAwTimesDataToSchema = (
	awTimes: AwTimeRow[],
	locationId: number,
): BeerLocationAwTimeInsert[] =>
	awTimes?.map((time) => ({ location_id: locationId, aw_time_id: time.id })) ??
	[];

export const getRandomIntInclusive = (
	min: number = -1_000_000,
	max: number = 0,
) => {
	const randomBuffer = new Uint32Array(1);
	crypto.getRandomValues(randomBuffer);

	let randomNumber = randomBuffer[0] / (0xffffffff + 1);

	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(randomNumber * (max - min + 1)) + min;
};

export const awTimeHasId = (
	time: AwTimeInsert,
): time is Omit<AwTimeInsert, "id"> & { id: number } => Boolean(time.id);

export const awTimeHasNoId = (time: AwTimeInsert) => !awTimeHasId(time);
