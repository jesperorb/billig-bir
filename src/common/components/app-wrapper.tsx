import { MantineProvider } from "@mantine/core";
import { QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, useRef } from "react";

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
				</QueryClientProvider>
			</MantineProvider>
		</>
	);
};

export default AppWrapper;
