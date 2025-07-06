import { type Database } from "@common/api/types"
import { type SupabaseClient } from "@supabase/supabase-js"
import { type BeerLocationFormData } from "./types"
import { useMutation } from "@tanstack/react-query";
import { useApiClient } from "@common/api/api-client-context";
import {
	awTimesFormDataToSchema,
	beerLocationFormDataToSchema,
	locationAwTimesDataToSchema,
	removeEmptyStrings
} from "./utils";

const createBeerLocationBaseQueryKeys = {
	create: "createBeerLocation",
	update: "updateBeerLocation"
} as const;

const createBeerLocationQueryKeys = {
	create: [createBeerLocationBaseQueryKeys.create],
	update: [createBeerLocationBaseQueryKeys.update],
};

export const createBeerLocation = (apiClient: SupabaseClient<Database>) =>
	async (values: BeerLocationFormData) => {
		const { data: locationData } = await apiClient
			.from("location")
			.insert(beerLocationFormDataToSchema(removeEmptyStrings(values)))
			.select()
			.single();
		if (values.awTimes?.length && locationData) {
			const { data: awTimesData } = await apiClient
				.from("aw_time")
				.insert(awTimesFormDataToSchema(values.awTimes))
				.select();
			if (awTimesData?.length) {
				await apiClient.from("location_aw_time").insert(
					locationAwTimesDataToSchema(
						awTimesData,
						locationData.id
					)
				)
			}
		}
}

export const updateBeerLocation = (apiClient: SupabaseClient<Database>) =>
	async (values: BeerLocationFormData) => {
		await apiClient
			.from("location")
			.update(beerLocationFormDataToSchema(removeEmptyStrings(values)))
			.eq('id', values.id)
		if (values.awTimes?.length) {
			const { data: awTimesData } = await apiClient
				.from("aw_time")
				.upsert(awTimesFormDataToSchema(values.awTimes))
				.select();
			if (awTimesData?.length) {
				await apiClient.from("location_aw_time").upsert(
					locationAwTimesDataToSchema(
						awTimesData,
						values.id
					)
				)
			}
		}
}

export const useCreateBeerLocation = () => {
	const apiClient = useApiClient();
	return useMutation<void, unknown, BeerLocationFormData>({
		mutationKey: createBeerLocationQueryKeys.create,
		mutationFn: createBeerLocation(apiClient)
	})
}

export const useUpdateBeerLocation = () => {
	const apiClient = useApiClient();
	return useMutation<void, unknown, BeerLocationFormData>({
		mutationKey: createBeerLocationQueryKeys.create,
		mutationFn: updateBeerLocation(apiClient)
	})
}
