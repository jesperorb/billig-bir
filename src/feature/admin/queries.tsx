import { type SupabaseClient } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";

import { useApiClient } from "@common/api/api-client-context";
import { type Database } from "@common/api/types";
import type {
	AWStartAndEndTimesFormData,
	BeerLocationFormData,
} from "@common/types/beer-location-form-data";
import type { District } from "@common/types/district";
import {
	awTimeFormDataToSchema,
	awTimeHasId,
	awTimeHasNoId,
	awTimesFormDataToSchema,
	locationAwTimesDataToSchema,
} from "@common/utils/aw-time";
import { beerLocationFormDataToSchema } from "@common/utils/beer-location";
import { removeEmptyStrings } from "@common/utils/object";

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

export const createBeerLocation =
	(apiClient: SupabaseClient<Database>) =>
	async (values: BeerLocationFormData) => {
		const { data: locationData, error: locationError } = await apiClient
			.from("location")
			.insert(beerLocationFormDataToSchema(removeEmptyStrings(values)))
			.select()
			.single();

		if (locationError) {
			throw new Error(`Failed to create location: ${locationError.message}`);
		}

		try {
			if (values.districtIds && locationData.id) {
				for (const districtId of values.districtIds) {
					await createLocationDistrict(apiClient)(
						Number(districtId),
						locationData.id,
					);
				}
			}
			if (values.awTimes?.length) {
				const { data: awTimesData, error: awTimesError } = await apiClient
					.from("aw_time")
					.insert(awTimesFormDataToSchema(values.awTimes))
					.select();

				if (awTimesError) {
					throw new Error(`Failed to create aw times: ${awTimesError.message}`);
				}

				if (awTimesData.length) {
					const { error: locationAwTimesError } = await apiClient
						.from("location_aw_time")
						.insert(locationAwTimesDataToSchema(awTimesData, locationData.id));

					if (locationAwTimesError) {
						throw new Error(
							`Failed to create location aw time relations: ${locationAwTimesError.message}`,
						);
					}
				}
			}
		} catch (error) {
			await deleteBeerLocation(apiClient)({
				...values,
				id: locationData.id,
			});
			throw error;
		}
	};

export const updateBeerLocation =
	(apiClient: SupabaseClient<Database>) =>
	async (values: BeerLocationFormData) => {
		const { error: updateError } = await apiClient
			.from("location")
			.update({
				...beerLocationFormDataToSchema(removeEmptyStrings(values)),
				id: undefined,
			})
			.eq("id", values.id);

		if (updateError) {
			throw new Error(`Failed to update location: ${updateError.message}`);
		}

		if (values.districtIds && values.id) {
			await deleteLocationDistrict(apiClient)(values.id);
			for (const districtId of values.districtIds) {
				await createLocationDistrict(apiClient)(Number(districtId), values.id);
			}
		}
		if (!values.awTimes?.length) return;
		const times = awTimesFormDataToSchema(values.awTimes);
		const toUpdate = times.filter(awTimeHasId);
		const toCreate = times.filter(awTimeHasNoId);
		if (toUpdate.length) {
			for (const time of toUpdate) {
				const { error: updateAwTimeError } = await apiClient
					.from("aw_time")
					.update({ ...time, id: undefined })
					.eq("id", time.id);

				if (updateAwTimeError) {
					throw new Error(
						`Failed to update aw time: ${updateAwTimeError.message}`,
					);
				}
			}
		}
		for (const time of toCreate) {
			const { data: awTimesToCreate, error: createAwTimeError } =
				await apiClient.from("aw_time").insert(time).select();

			if (createAwTimeError) {
				throw new Error(
					`Failed to create aw time: ${createAwTimeError.message}`,
				);
			}

			if (!awTimesToCreate.length) return;
			const { error: locationAwTimeError } = await apiClient
				.from("location_aw_time")
				.insert(locationAwTimesDataToSchema(awTimesToCreate, values.id));

			if (locationAwTimeError) {
				throw new Error(
					`Failed to create location aw time relation: ${locationAwTimeError.message}`,
				);
			}
		}
	};

export const deleteBeerLocation =
	(apiClient: SupabaseClient<Database>) =>
	async (values: BeerLocationFormData) => {
		if (values.awTimes?.length) {
			for (const time of values.awTimes) {
				await deleteAwTime(apiClient)(time);
			}
		}
		if (values.districts?.length) {
			await deleteLocationDistrict(apiClient)(values.id);
		}
		const { error } = await apiClient
			.from("location")
			.delete()
			.eq("id", values.id);

		if (error) {
			throw new Error(`Failed to delete location: ${error.message}`);
		}
	};

export const deleteAwTime =
	(apiClient: SupabaseClient<Database>) =>
	async (value: AWStartAndEndTimesFormData) => {
		if (value.id < 0) return;

		const { error: relationError } = await apiClient
			.from("location_aw_time")
			.delete()
			.eq("aw_time_id", value.id);

		if (relationError) {
			throw new Error(
				`Failed to delete location aw time relation: ${relationError.message}`,
			);
		}

		const { error: awTimeError } = await apiClient
			.from("aw_time")
			.delete()
			.eq("id", value.id);

		if (awTimeError) {
			throw new Error(`Failed to delete aw time: ${awTimeError.message}`);
		}
	};

export const createAwTime =
	(apiClient: SupabaseClient<Database>) =>
	async ({
		value,
		locationId,
	}: {
		value: AWStartAndEndTimesFormData;
		locationId: number;
	}) => {
		const { data: awTimeData, error: awTimeError } = await apiClient
			.from("aw_time")
			.insert(awTimeFormDataToSchema(value))
			.select()
			.single();

		if (awTimeError) {
			throw new Error(`Failed to create aw time: ${awTimeError.message}`);
		}

		const { error: relationError } = await apiClient
			.from("location_aw_time")
			.insert({ location_id: locationId, aw_time_id: awTimeData.id });

		if (relationError) {
			throw new Error(
				`Failed to create location aw time relation: ${relationError.message}`,
			);
		}
	};

export const createLocationDistrict =
	(apiClient: SupabaseClient<Database>) =>
	async (districtId: number, locationId: number) => {
		const { error } = await apiClient
			.from("location_district")
			.upsert({ district_id: districtId, location_id: locationId })
			.select();

		if (error) {
			throw new Error(`Failed to create location district: ${error.message}`);
		}
	};

export const deleteLocationDistrict =
	(apiClient: SupabaseClient<Database>) => async (locationId: number) => {
		const { error } = await apiClient
			.from("location_district")
			.delete()
			.eq("location_id", locationId);

		if (error) {
			throw new Error(`Failed to delete location district: ${error.message}`);
		}
	};

export const updateDistrict =
	(apiClient: SupabaseClient<Database>) => async (district: District) => {
		const { error } = await apiClient
			.from("district")
			.update({
				name: district.name,
				inside_tolls: district.insideTolls,
			})
			.eq("id", district.id);

		if (error) {
			throw new Error(`Failed to update district: ${error.message}`);
		}
	};

export const createDistrict =
	(apiClient: SupabaseClient<Database>) =>
	async (district: { name: string; insideTolls: boolean }) => {
		const { error } = await apiClient.from("district").insert({
			name: district.name,
			inside_tolls: district.insideTolls,
		});

		if (error) {
			throw new Error(`Failed to create district: ${error.message}`);
		}
	};

export const deleteDistrict =
	(apiClient: SupabaseClient<Database>) => async (districtId: number) => {
		const { error } = await apiClient
			.from("district")
			.delete()
			.eq("id", districtId);

		if (error) {
			throw new Error(`Failed to delete district: ${error.message}`);
		}
	};

export const useCreateBeerLocation = () => {
	const apiClient = useApiClient();
	return useMutation<unknown, unknown, BeerLocationFormData>({
		mutationKey: createBeerLocationQueryKeys.createBeerLocation,
		mutationFn: createBeerLocation(apiClient),
	});
};

export const useUpdateBeerLocation = () => {
	const apiClient = useApiClient();
	return useMutation<unknown, unknown, BeerLocationFormData>({
		mutationKey: createBeerLocationQueryKeys.createBeerLocation,
		mutationFn: updateBeerLocation(apiClient),
	});
};

export const useDeleteBeerLocation = () => {
	const apiClient = useApiClient();
	return useMutation<unknown, unknown, BeerLocationFormData>({
		mutationKey: createBeerLocationQueryKeys.deleteBeerLocation,
		mutationFn: deleteBeerLocation(apiClient),
	});
};

export const useDeleteAwTime = () => {
	const apiClient = useApiClient();
	return useMutation<unknown, unknown, AWStartAndEndTimesFormData>({
		mutationKey: createBeerLocationQueryKeys.deleteAwTime,
		mutationFn: deleteAwTime(apiClient),
	});
};

export const useCreateAwTime = () => {
	const apiClient = useApiClient();
	return useMutation<
		unknown,
		unknown,
		{ value: AWStartAndEndTimesFormData; locationId: number }
	>({
		mutationKey: createBeerLocationQueryKeys.deleteAwTime,
		mutationFn: createAwTime(apiClient),
	});
};

export const useUpdateDistrict = () => {
	const apiClient = useApiClient();
	return useMutation<unknown, unknown, District>({
		mutationKey: createBeerLocationQueryKeys.updateDistrict,
		mutationFn: updateDistrict(apiClient),
	});
};

export const useCreateDistrict = () => {
	const apiClient = useApiClient();
	return useMutation<unknown, unknown, District>({
		mutationKey: createBeerLocationQueryKeys.createDistrict,
		mutationFn: createDistrict(apiClient),
	});
};

export const useDeleteDistrict = () => {
	const apiClient = useApiClient();
	return useMutation<unknown, unknown, number>({
		mutationKey: createBeerLocationQueryKeys.deleteDistrict,
		mutationFn: deleteDistrict(apiClient),
	});
};
