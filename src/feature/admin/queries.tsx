import { type Database } from "@common/api/types"
import { type SupabaseClient } from "@supabase/supabase-js"
import { type BeerLocationFormData } from "./types"
import { useMutation } from "@tanstack/react-query";
import { useApiClient } from "@common/api/api-client-context";
import {
	awTimesFormDataToDatabaseSchema,
	beerLocationFormDataToDatabaseSchema,
	locationAwTimesDataToDatabaseSchema,
	removeEmptyStrings
} from "./utils";

const createBeerLocationBaseQueryKeys = {
	create: "createBeerLocation",
} as const;

const createBeerLocationQueryKeys = {
	create: [createBeerLocationBaseQueryKeys.create],
};


export const createLocation = (apiClient: SupabaseClient<Database>) => async (values: BeerLocationFormData) => {
	const { data: locationData } = await apiClient
		.from("location")
		.insert( beerLocationFormDataToDatabaseSchema(removeEmptyStrings(values)))
		.select()
		.single();
	if (values.awTimes.length && locationData) {
		const { data: awTimesData } = await apiClient
			.from("aw_time")
			.insert(awTimesFormDataToDatabaseSchema(values.awTimes))
			.select();
		if (awTimesData?.length) {
			await apiClient.from("location_aw_time").insert(
				locationAwTimesDataToDatabaseSchema(
					awTimesData,
					locationData.id
				)
			)
		}
	}
}

export const useCreateBeerLocation = () => {
	const apiClient = useApiClient();
	return useMutation<unknown, unknown, BeerLocationFormData>({
		mutationKey: createBeerLocationQueryKeys.create,
		mutationFn: createLocation(apiClient)
	})
}
