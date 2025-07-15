import { NavLink } from "@common/components/nav-link";
import { useToggleIsMenuOpen } from "@common/context/menu-context";
import { AppShell, Space, Title } from "@mantine/core"
import { IconPlus, IconBeer, IconBuildings, IconBulb } from "@tabler/icons-react";

export const AdminNavigation = () => {
	const toggleMenu = useToggleIsMenuOpen();
	return (
		<AppShell.Navbar>
			<Title order={2} px="sm" pt="sm">Meny</Title>
			<Space h="md" />
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
		</AppShell.Navbar>
	);
}
