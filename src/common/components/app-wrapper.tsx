import { PropsWithChildren, useRef } from "react";
import {
	MantineProvider,
} from "@mantine/core";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { getSupabaseClient } from "@common/api/api-client";
import { ApiClientContext } from "@common/api/api-client-context";
import { getQueryClient } from "@common/api/query-client";
import { theme } from "@common/theme";

import "@mantine/core/styles.css";

const AppWrapper = ({ children }: PropsWithChildren) => {
	const queryClient = useRef(getQueryClient());
	const apiClient = useRef(getSupabaseClient())
	return (
		<>
			<MantineProvider theme={theme} defaultColorScheme="light">
				<ApiClientContext value={apiClient.current}>
					<QueryClientProvider client={queryClient.current}>
						{children}
						<ReactQueryDevtools />
					</QueryClientProvider>
				</ApiClientContext>
			</MantineProvider>
			<TanStackRouterDevtools />
		</>
	);
};

export default AppWrapper;
