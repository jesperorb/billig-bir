import { useQuery } from "@tanstack/react-query";
import { SupabaseClient } from "@supabase/supabase-js";

import { Database } from "@common/api/types";
import { useApiClient } from "@common/api/api-client-context";
import { BeerLocation } from "@common/types/beer-location";

export const districtBaseQueryKeys = {
	getDistricts: "getDistricts",
} as const;

export const districtQueryKeys = {
	getDistricts: [districtBaseQueryKeys.getDistricts],
};

export const getDistricts = async (apiClient: SupabaseClient<Database>) => {
	return apiClient
		.from("district")
		.select(
			`
				id,
				name
			`,
		)
		.order("name")
		.overrideTypes<BeerLocation[]>()
};

export const useDistricts = () => {
	const apiClient = useApiClient();
	return useQuery({
		queryKey: districtQueryKeys.getDistricts,
		queryFn: () => getDistricts(apiClient).then(data => data.data),
		staleTime: 10 * 60 * 1000,
	});
};
