import { NavLink } from "@common/components/nav-link";
import { AppShell, Space, Title } from "@mantine/core"
import { IconPlus, IconBeer } from "@tabler/icons-react";

export const AdminNavigation = () => {
	return (
		<AppShell.Navbar>
			<Title order={2} px="sm" pt="sm">Meny</Title>
			<Space h="md" />
			<NavLink
				to="/admin/view-beer-locations"
				label="Platser"
				leftSection={<IconBeer />}
			/>
			<NavLink
				to="/admin/add-beer-location"
				label="Lägg till plats"
				leftSection={<IconPlus />}
			/>
		</AppShell.Navbar>
	);
}
