import { PropsWithChildren, useRef } from "react";
import {
	MantineProvider,
} from "@mantine/core";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { getQueryClient } from "@common/api/query-client";
import { theme } from "@common/theme";

import "@mantine/core/styles.css";

const AppWrapper = ({ children }: PropsWithChildren) => {
	const queryClient = useRef(getQueryClient());
	return (
		<>
			<MantineProvider theme={theme} defaultColorScheme="light">
				<QueryClientProvider client={queryClient.current}>
					{children}
					<ReactQueryDevtools />
				</QueryClientProvider>
			</MantineProvider>
			<TanStackRouterDevtools />
		</>
	);
};

export default AppWrapper;
