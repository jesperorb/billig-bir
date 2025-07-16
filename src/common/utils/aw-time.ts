import type { Database } from "@common/api/types";
import type { AWStartAndEndTimes } from "@common/types/beer-location";

type AwTimeRow = Database["public"]["Tables"]["aw_time"]["Row"];
type AwTimeInsert = Database["public"]["Tables"]["aw_time"]["Insert"];
type BeerLocationAwTimeInsert =
	Database["public"]["Tables"]["location_aw_time"]["Insert"];

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
	awTimes.map((time) => ({ location_id: locationId, aw_time_id: time.id }));

export const awTimeHasId = (
	time: AwTimeInsert,
): time is Omit<AwTimeInsert, "id"> & { id: number } => Boolean(time.id);

export const awTimeHasNoId = (time: AwTimeInsert) => !awTimeHasId(time);
