import { AppShell, Button, Group, Space, Stack, Title } from "@mantine/core";
import {
	IconPlus,
	IconBeer,
	IconBuildings,
	IconBulb,
} from "@tabler/icons-react";
import { useNavigate } from "@tanstack/react-router";

import { useApiClient } from "@common/api/api-client-context";
import { NavLink } from "@common/components/nav-link";
import { useToggleIsMenuOpen } from "@common/context/menu-context";

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
					<NavLink
						to="/admin/view-beer-locations"
						label="Platser"
						leftSection={<IconBeer />}
						onClick={toggleMenu}
					/>
					<NavLink
						to="/admin/view-beer-location-submissions"
						label="Platsförslag"
						leftSection={<IconBulb />}
						onClick={toggleMenu}
					/>
					<NavLink
						to="/admin/view-districts"
						label="Stadsdelar"
						leftSection={<IconBuildings />}
						onClick={toggleMenu}
					/>
					<NavLink
						to="/admin/add-beer-location"
						label="Lägg till plats"
						leftSection={<IconPlus />}
						onClick={toggleMenu}
					/>
				</Group>
				<Button
					m="md"
					onClick={async () => {
						await apiClient.auth.signOut();
						navigate({ to: "/" });
						close();
					}}
				>
					Logga ut
				</Button>
			</Stack>
		</AppShell.Navbar>
	);
};
