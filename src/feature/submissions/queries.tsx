import { type SupabaseClient } from "@supabase/supabase-js";
import { useMutation, useQuery } from "@tanstack/react-query";

import { useApiClient } from "@common/api/api-client-context";
import { beerLocationsSelectQuery } from "@common/api/queries";
import { type Database } from "@common/api/types";
import { BeerLocation } from "@common/types/beer-location";
import type {
	AWStartAndEndTimesFormData,
	BeerLocationFormData,
} from "@common/types/beer-location-form-data";
import { awTimeFormDataToSchema } from "@common/utils/aw-time";
import { beerLocationFormDataToSchema } from "@common/utils/beer-location";
import { getRandomIntInclusive } from "@common/utils/number";
import { removeEmptyStrings } from "@common/utils/object";

const createBeerLocationSubmissionBaseQueryKeys = {
	getBeerLocationSubmissions: "getBeerLocationSubmissions",
	createBeerLocationSubmission: "createBeerLocationSubmission",
	approveBeerLocationSubmission: "approveBeerLocationSubmission",
	createAwTimeSubmission: "createAwTimeSubmission",
	deleteAwTimeSubmission: "deleteAwTimeSubmission",
} as const;

export const createBeerLocationSubmissionQueryKeys = {
	getBeerLocationSubmissions: [
		createBeerLocationSubmissionBaseQueryKeys.getBeerLocationSubmissions,
	],
	createBeerLocationSubmission: [
		createBeerLocationSubmissionBaseQueryKeys.createBeerLocationSubmission,
	],
	approveBeerLocationSubmission: [
		createBeerLocationSubmissionBaseQueryKeys.approveBeerLocationSubmission,
	],
	createAwTimeSubmission: [
		createBeerLocationSubmissionBaseQueryKeys.createAwTimeSubmission,
	],
	deleteAwTimeSubmission: [
		createBeerLocationSubmissionBaseQueryKeys.deleteAwTimeSubmission,
	],
} as const;

export const createBeerLocationSubmission =
	(apiClient: SupabaseClient<Database>) =>
	async (values: BeerLocationFormData) => {
		const { data: locationData } = await apiClient
			.from("location_submission")
			.insert(beerLocationFormDataToSchema(removeEmptyStrings(values)))
			.select()
			.single();
		if (values.districtId && locationData) {
			await createLocationDistrictSubmission(apiClient)(
				values.districtId,
				locationData.id,
			);
		}
		if (values.awTimes?.length && locationData) {
			for (const time of values.awTimes) {
				await createAwTimeSubmission(apiClient)({
					value: time,
					locationId: locationData.id,
				});
			}
		}
	};

export const approveBeerLocationSubmission =
	(apiClient: SupabaseClient<Database>) =>
	async (values: BeerLocationFormData) => {
		const { data: locationData } = await apiClient
			.from("location")
			.insert(
				beerLocationFormDataToSchema(
					removeEmptyStrings({ ...values, id: getRandomIntInclusive() }),
				),
			)
			.select()
			.single();
		if (values.awTimes?.length && locationData) {
			for (const time of values.awTimes) {
				await createAwTime(apiClient)({
					value: { ...time, id: getRandomIntInclusive() },
					locationId: locationData.id,
				});
			}
		}
		if (values.districtId && locationData?.id) {
			await createLocationDistrict(apiClient)(
				values.districtId,
				locationData.id,
			);
		}
	};

export const deleteBeerLocationSubmission =
	(apiClient: SupabaseClient<Database>) =>
	async (values: BeerLocationFormData) => {
		if (values.awTimes?.length) {
			for (const time of values.awTimes) {
				await deleteAwTimeSubmission(apiClient)(time);
			}
		}
		if (values.districts?.length) {
			await deleteLocationDistrictSubmission(apiClient)(values.id);
		}
		await apiClient.from("location_submission").delete().eq("id", values.id);
	};

export const deleteAwTimeSubmission =
	(apiClient: SupabaseClient<Database>) =>
	async (value: AWStartAndEndTimesFormData) => {
		if (value.id < 0) return;
		await apiClient
			.from("location_aw_time_submission")
			.delete()
			.eq("aw_time_id", value.id);
		await apiClient.from("aw_time_submission").delete().eq("id", value.id);
	};

export const createAwTimeSubmission =
	(apiClient: SupabaseClient<Database>) =>
	async ({
		value,
		locationId,
	}: {
		value: AWStartAndEndTimesFormData;
		locationId: number;
	}) => {
		const response = await apiClient
			.from("aw_time_submission")
			.insert(awTimeFormDataToSchema(value))
			.select()
			.single();
		if (response.data) {
			await apiClient
				.from("location_aw_time_submission")
				.insert({ location_id: locationId, aw_time_id: response.data.id });
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
	};

export const createLocationDistrictSubmission =
	(apiClient: SupabaseClient<Database>) =>
	async (districtId: number, locationId: number) => {
		await apiClient
			.from("location_district_submission")
			.insert({ district_id: districtId, location_id: locationId });
	};

export const createLocationDistrict =
	(apiClient: SupabaseClient<Database>) =>
	async (districtId: number, locationId: number) => {
		await apiClient
			.from("location_district")
			.insert({ district_id: districtId, location_id: locationId });
	};

export const deleteLocationDistrictSubmission =
	(apiClient: SupabaseClient<Database>) => async (locationId: number) => {
		await apiClient
			.from("location_district_submission")
			.delete()
			.eq("location_id", locationId);
	};

export const getBeerLocationSubmissions = async (
	apiClient: SupabaseClient<Database>,
) => {
	return apiClient
		.from("location_submission")
		.select(beerLocationsSelectQuery)
		.order("name")
		.overrideTypes<BeerLocation[]>();
};

export const useBeerLocationSubmissions = () => {
	const apiClient = useApiClient();
	return useQuery({
		queryKey: createBeerLocationSubmissionQueryKeys.getBeerLocationSubmissions,
		queryFn: () =>
			getBeerLocationSubmissions(apiClient).then((data) => data.data),
		staleTime: 60 * 60 * 5,
	});
};

export const useCreateBeerLocationSubmission = () => {
	const apiClient = useApiClient();
	return useMutation<unknown, unknown, BeerLocationFormData>({
		mutationKey: createBeerLocationSubmissionQueryKeys.createAwTimeSubmission,
		mutationFn: createBeerLocationSubmission(apiClient),
	});
};

export const useDeleteBeerLocationSubmission = () => {
	const apiClient = useApiClient();
	return useMutation<unknown, unknown, BeerLocationFormData>({
		mutationKey: createBeerLocationSubmissionQueryKeys.deleteAwTimeSubmission,
		mutationFn: deleteBeerLocationSubmission(apiClient),
	});
};

export const useApproveBeerLocationSubmission = () => {
	const apiClient = useApiClient();
	return useMutation<unknown, unknown, BeerLocationFormData>({
		mutationKey:
			createBeerLocationSubmissionQueryKeys.approveBeerLocationSubmission,
		mutationFn: approveBeerLocationSubmission(apiClient),
	});
};
