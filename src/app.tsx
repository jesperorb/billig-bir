import { useRef } from "react";
import {
	AppShell,
	Burger,
	Flex,
	Group,
	MantineProvider,
	Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { getSupabaseClient } from "@common/api/api-client";
import { ApiClientContext } from "@common/api/api-client-context";
import { getQueryClient } from "@common/api/query-client";
import { theme } from "@common/theme";

import { Map } from "@feature/map/components/map"

import "@mantine/core/styles.css";
import { ThemeToggle } from "@common/theme/ThemeToggle";
import { InformationModal } from "@common/components/information-modal";

const App = () => {
	const [menuOpen, { toggle }] = useDisclosure();
	const queryClient = useRef(getQueryClient());
	const apiClient = useRef(getSupabaseClient())
	return (
		<MantineProvider theme={theme} defaultColorScheme="light">
			<ApiClientContext value={apiClient.current}>
				<QueryClientProvider client={queryClient.current}>
					<AppShell
						header={{ height: 70 }}
						navbar={{
							width: 300,
							breakpoint: "sm",
							collapsed: { mobile: !menuOpen },
						}}
					>
						<AppShell.Header>
							<Flex justify="space-between" align="center">
								<Group h="100%" p="sm">
									<Burger
										opened={menuOpen}
										onClick={toggle}
										hiddenFrom="sm"
										size="sm"
									/>
									<Title order={1}>Billig bir</Title>
								</Group>
								<Group h="100%" p="xs">
									<ThemeToggle />
									<InformationModal />
								</Group>
							</Flex>
						</AppShell.Header>
						<Map toggleMenu={toggle} />
					</AppShell>
					<ReactQueryDevtools />
				</QueryClientProvider>
			</ApiClientContext>
		</MantineProvider>
	);
};

export default App;
