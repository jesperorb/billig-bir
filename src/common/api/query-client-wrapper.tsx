import { QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, useRef } from "react";

import { getQueryClient } from "@common/api/query-client";

const QueryClientWrapper = ({ children }: PropsWithChildren) => {
	const queryClient = useRef(getQueryClient());
	return (
		<>
			<QueryClientProvider client={queryClient.current}>
				{children}
			</QueryClientProvider>
		</>
	);
};

export default QueryClientWrapper;
