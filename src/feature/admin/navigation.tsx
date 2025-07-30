import { AppShell, Button, Group, Space, Stack, Title } from "@mantine/core";
import { useNavigate } from "@tanstack/react-router";

import { useApiClient } from "@common/api/api-client-context";
import { useToggleIsMenuOpen } from "@common/context/menu-context";

import { NavigationLinks } from "./components/navigation-links";

export const AdminNavigation = () => {
	const toggleMenu = useToggleIsMenuOpen();
	const apiClient = useApiClient();
	const navigate = useNavigate();
	return (
		<AppShell.Navbar>
			<Title order={2} px="sm" pt="sm">
				Meny
			</Title>
			<Space h="md" />
			<Stack align="stretch" justify="space-between" gap="md" h="100%">
				<Group>
					<NavigationLinks toggleMenu={toggleMenu} />
				</Group>
				<Group m="sm">
					<Button
						fullWidth
						variant="outline"
						onClick={async () => {
							await apiClient.auth.signOut();
							navigate({ to: "/" });
							close();
						}}
					>
						Logga ut
					</Button>
				</Group>
			</Stack>
		</AppShell.Navbar>
	);
};
