import {
	IconBeer,
	IconBuildings,
	IconBulb,
	IconPlus,
} from "@tabler/icons-react";

import { NavLink } from "@common/components/nav-link";

interface Props {
	toggleMenu?: () => void;
}

export const NavigationLinks = ({ toggleMenu }: Props) => {
	return (
		<>
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
		</>
	);
};
