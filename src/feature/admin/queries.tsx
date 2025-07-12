import { type Database } from "@common/api/types"
import { type SupabaseClient } from "@supabase/supabase-js"
import { AWStartAndEndTimesFormData, type BeerLocationFormData } from "./types"
import { useMutation } from "@tanstack/react-query";
import { useApiClient } from "@common/api/api-client-context";
import {
	awTimeFormDataToSchema,
	awTimeHasId,
	awTimeHasNoId,
	awTimesFormDataToSchema,
	beerLocationFormDataToSchema,
	locationAwTimesDataToSchema,
	removeEmptyStrings
} from "./utils";

const createBeerLocationBaseQueryKeys = {
	create: "createBeerLocation",
	update: "updateBeerLocation",
	delete: "deleteBeerLocation",
	createAwTime: "createAwTime",
	deleteAwTime: "deleteAwTime",
} as const;

const createBeerLocationQueryKeys = {
	createBeerLocation: [createBeerLocationBaseQueryKeys.create],
	updateBeerLocation: [createBeerLocationBaseQueryKeys.update],
	deleteBeerLocation: [createBeerLocationBaseQueryKeys.delete],
	createAwTime: [createBeerLocationBaseQueryKeys.createAwTime],
	deleteAwTime: [createBeerLocationBaseQueryKeys.deleteAwTime],
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
		if (!values.awTimes?.length) return;
		const times = awTimesFormDataToSchema(values.awTimes);
		const toUpdate = times.filter(awTimeHasId);
		const toCreate = times.filter(awTimeHasNoId);
		if (!toUpdate.length) return;
		for await (const time of toUpdate) {
			await apiClient
				.from("aw_time")
				.update(time)
				.eq("id", time.id);
		}
		for await (const time of toCreate) {
			const { data: awTimesToCreate } = await apiClient
				.from("aw_time")
				.insert(time)
				.select();
			if (!awTimesToCreate?.length) return;
			await apiClient.from("location_aw_time").insert(
				locationAwTimesDataToSchema(
					awTimesToCreate,
					values.id
				)
			)
		}
	}

export const deleteBeerLocation = (apiClient: SupabaseClient<Database>) =>
	async (values: BeerLocationFormData) => {
		if (values.awTimes?.length) {
			for await (const time of values.awTimes) {
				await deleteAwTime(apiClient)(time);
			}
		}
		await apiClient
			.from("location")
			.delete()
			.eq('id', values.id);
	}

export const deleteAwTime = (apiClient: SupabaseClient<Database>) =>
	async (value: AWStartAndEndTimesFormData) => {
		if (value.id < 0) return;
		await apiClient
			.from("location_aw_time")
			.delete()
			.eq("aw_time_id", value.id);
		await apiClient
			.from("aw_time")
			.delete()
			.eq("id", value.id);
	}

export const createAwTime = (apiClient: SupabaseClient<Database>) =>
	async ({ value, locationId }: { value: AWStartAndEndTimesFormData, locationId: number }) => {
		const response = await apiClient
			.from("aw_time")
			.insert(awTimeFormDataToSchema(value))
			.select()
			.single();
		if (response.data) {
			await apiClient
				.from("location_aw_time")
				.insert({ location_id: locationId, aw_time_id: response.data.id });
		}
	}

export const useCreateBeerLocation = () => {
	const apiClient = useApiClient();
	return useMutation<void, unknown, BeerLocationFormData>({
		mutationKey: createBeerLocationQueryKeys.createBeerLocation,
		mutationFn: createBeerLocation(apiClient)
	})
}

export const useUpdateBeerLocation = () => {
	const apiClient = useApiClient();
	return useMutation<void, unknown, BeerLocationFormData>({
		mutationKey: createBeerLocationQueryKeys.createBeerLocation,
		mutationFn: updateBeerLocation(apiClient)
	})
}

export const useDeleteBeerLocation = () => {
	const apiClient = useApiClient();
	return useMutation<void, unknown, BeerLocationFormData>({
		mutationKey: createBeerLocationQueryKeys.deleteBeerLocation,
		mutationFn: deleteBeerLocation(apiClient)
	})
}

export const useDeleteAwTime = () => {
	const apiClient = useApiClient();
	return useMutation<void, unknown, AWStartAndEndTimesFormData>({
		mutationKey: createBeerLocationQueryKeys.deleteAwTime,
		mutationFn: deleteAwTime(apiClient)
	})
}

export const useCreateAwTime = () => {
	const apiClient = useApiClient();
	return useMutation<void, unknown, { value: AWStartAndEndTimesFormData, locationId: number }>({
		mutationKey: createBeerLocationQueryKeys.deleteAwTime,
		mutationFn: createAwTime(apiClient)
	})
}
