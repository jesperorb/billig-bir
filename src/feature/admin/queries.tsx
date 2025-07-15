import { type Database } from "@common/api/types"
import { type SupabaseClient } from "@supabase/supabase-js"
import { useMutation } from "@tanstack/react-query";
import { useApiClient } from "@common/api/api-client-context";
import type { AWStartAndEndTimesFormData, BeerLocationFormData } from "@common/types/beer-location-form-data";
import type { District } from "@common/types/district";
import { removeEmptyStrings } from "@common/utils/object";
import { beerLocationFormDataToSchema } from "@common/utils/beer-location";
import { awTimeFormDataToSchema, awTimeHasId, awTimeHasNoId, awTimesFormDataToSchema, locationAwTimesDataToSchema } from "@common/utils/aw-time";

const createBeerLocationBaseQueryKeys = {
	createBeerLocation: "createBeerLocation",
	updateBeerLocation: "updateBeerLocation",
	deleteBeerLocation: "deleteBeerLocation",
	createAwTime: "createAwTime",
	deleteAwTime: "deleteAwTime",
	updateDistrict: "updateDistrict",
	createDistrict: "createDistrict",
	deleteDistrict: "deleteDistrict",
} as const;

const createBeerLocationQueryKeys = {
	createBeerLocation: [createBeerLocationBaseQueryKeys.createBeerLocation],
	updateBeerLocation: [createBeerLocationBaseQueryKeys.updateBeerLocation],
	deleteBeerLocation: [createBeerLocationBaseQueryKeys.deleteBeerLocation],
	createAwTime: [createBeerLocationBaseQueryKeys.createAwTime],
	deleteAwTime: [createBeerLocationBaseQueryKeys.deleteAwTime],
	updateDistrict: [createBeerLocationBaseQueryKeys.updateDistrict],
	createDistrict: [createBeerLocationBaseQueryKeys.createDistrict],
	deleteDistrict: [createBeerLocationBaseQueryKeys.deleteDistrict],
};

export const createBeerLocation = (apiClient: SupabaseClient<Database>) =>
	async (values: BeerLocationFormData) => {
		const { data: locationData } = await apiClient
			.from("location")
			.insert(beerLocationFormDataToSchema(removeEmptyStrings(values)))
			.select()
			.single();
		if (values.districtId && locationData?.id) {
			await createLocationDistrict(apiClient)(values.districtId, locationData?.id);
		}
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
		console.log(values)
		if (values.districtId && values.id) {
			await deleteLocationDistrict(apiClient)(values.id);
			await createLocationDistrict(apiClient)(values.districtId, values.id)
		}
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
		if(values.districts?.length) {
			await deleteLocationDistrict(apiClient)(values.id);
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

export const createLocationDistrict = (apiClient: SupabaseClient<Database>) =>
	async (districtId: number, locationId: number) => {
		await apiClient
			.from("location_district")
			.upsert({ district_id: districtId, location_id: locationId, })
			.select();
	}

export const deleteLocationDistrict = (apiClient: SupabaseClient<Database>) =>
	async (locationId: number) => {
		await apiClient
			.from("location_district")
			.delete()
			.eq("location_id", locationId)
	}

export const updateDistrict = (apiClient: SupabaseClient<Database>) =>
	async (district: District) => {
		await apiClient
			.from("district")
			.update({
				name: district.name,
				inside_tolls: district.insideTolls,
			})
			.eq("id", district.id);
	}

export const createDistrict = (apiClient: SupabaseClient<Database>) =>
	async (district: { name: string; insideTolls: boolean }) => {
		await apiClient
			.from("district")
			.insert({
				name: district.name,
				inside_tolls: district.insideTolls,
			});
	}

export const deleteDistrict = (apiClient: SupabaseClient<Database>) =>
	async (districtId: number) => {		
		await apiClient
			.from("district")
			.delete()
			.eq("id", districtId);
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

export const useUpdateDistrict = () => {
	const apiClient = useApiClient();
	return useMutation<void, unknown, District>({
		mutationKey: createBeerLocationQueryKeys.updateDistrict,
		mutationFn: updateDistrict(apiClient)
	})
}

export const useCreateDistrict = () => {
	const apiClient = useApiClient();
	return useMutation<void, unknown, District>({
		mutationKey: createBeerLocationQueryKeys.createDistrict,
		mutationFn: createDistrict(apiClient)
	})
}

export const useDeleteDistrict = () => {
	const apiClient = useApiClient();
	return useMutation<void, unknown, number>({
		mutationKey: createBeerLocationQueryKeys.deleteDistrict,
		mutationFn: deleteDistrict(apiClient)
	})
}
