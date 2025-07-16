import { type PropsWithChildren, useRef } from "react";

import { getSupabaseClient } from "@common/api/api-client";
import { ApiClientContext } from "@common/api/api-client-context";

const ApiClientWrapper = ({ children }: PropsWithChildren) => {
	const apiClient = useRef(getSupabaseClient());
	return (
		<ApiClientContext value={apiClient.current}>{children}</ApiClientContext>
	);
};

export default ApiClientWrapper;
