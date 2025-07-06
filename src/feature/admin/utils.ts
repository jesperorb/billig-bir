import type { Database } from "@common/api/types";
import type { AWStartAndEndTimesFormData, BeerLocationFormData } from "./types";

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

export const beerLocationFormDataToDatabaseSchema = (
	values: BeerLocationFormData,
): BeerLocationInsert => ({
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

export const awTimesFormDataToDatabaseSchema = (
	awTimes: AWStartAndEndTimesFormData[],
): AwTimeInsert[] =>
	awTimes.map((time) => ({
		weekday: time.weekday,
		same_times_all_week: time.sameTimesAllWeek,
		end_time: time.endTime,
		start_time: time.startTime,
	}));

export const locationAwTimesDataToDatabaseSchema = (
	awTimes: AwTimeRow[],
	locationId: number,
): BeerLocationAwTimeInsert[] =>
	awTimes?.map((time) => ({ location_id: locationId, aw_time_id: time.id })) ??
	[];
