import { AppShell, Center, Stack } from "@mantine/core";
import {
	IconBeer,
	IconBulb,
	IconBuildings,
	IconPlus,
} from "@tabler/icons-react";

import { NavButton } from "@common/components/nav-button";

const AdminOverview = () => {
	return (
		<AppShell.Main>
			<Center>
				<Stack gap="md" mt="xl" miw={500}>
					<NavButton
						fullWidth
						to="/admin/view-beer-locations"
						leftSection={<IconBeer />}
					>
						Platser
					</NavButton>
					<NavButton
						fullWidth
						to="/admin/view-beer-location-submissions"
						leftSection={<IconBulb />}
					>
						Platsförslag
					</NavButton>
					<NavButton
						fullWidth
						to="/admin/view-districts"
						leftSection={<IconBuildings />}
					>
						Stadsdelar
					</NavButton>
					<NavButton
						fullWidth
						to="/admin/add-beer-location"
						leftSection={<IconPlus />}
					>
						Lägg till plats
					</NavButton>
				</Stack>
			</Center>
		</AppShell.Main>
	);
};

export default AdminOverview;
